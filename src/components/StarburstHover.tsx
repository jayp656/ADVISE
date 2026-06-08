"use client";
import { useEffect, useRef } from "react";

const VERT = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;

  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  uniform float u_time;
  uniform float u_hover;
  uniform sampler2D u_texture;
  uniform float u_imageAspect;

  varying vec2 v_uv;

  float luminance(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  vec3 adjustSaturation(vec3 c, float amount) {
    return mix(vec3(luminance(c)), c, amount);
  }

  vec2 coverUv(vec2 uv) {
    float containerAspect = u_resolution.x / u_resolution.y;
    float imgAspect = u_imageAspect > 0.0 ? u_imageAspect : containerAspect;
    vec2 corrected = uv;
    if (imgAspect > containerAspect) {
      float scale = containerAspect / imgAspect;
      corrected.x = uv.x * scale + (1.0 - scale) * 0.5;
    } else {
      float scale = imgAspect / containerAspect;
      corrected.y = uv.y * scale + (1.0 - scale) * 0.5;
    }
    return clamp(corrected, vec2(0.001), vec2(0.999));
  }

  void main() {
    vec2 uv    = v_uv;
    vec2 mouse = u_mouse;

    float aspect = u_resolution.x / u_resolution.y;
    vec2 auv    = vec2(uv.x * aspect, uv.y);
    vec2 amouse = vec2(mouse.x * aspect, mouse.y);

    vec2  delta = auv - amouse;
    float dist  = length(delta);

    float softness  = 0.55;
    float focusMask = smoothstep(softness, 0.0, dist) * u_hover;

    vec3 color = texture2D(u_texture, coverUv(uv)).rgb;

    float rotA   = atan(delta.y, delta.x) + u_time * 0.25;
    float rayMask = pow(abs(cos(rotA * 4.0)), 5.0) * focusMask;

    vec3 outer = mix(color, vec3(luminance(color)) * 0.75, 0.7 * u_hover);
    vec3 inner = adjustSaturation(color * 1.25, 1.8) * 1.3;

    vec3 result = mix(outer, inner, rayMask);
    result += vec3(1.0, 0.95, 0.75) * exp(-dist * 25.0) * u_hover * 1.5;

    gl_FragColor = vec4(result, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function StarburstHover({
  src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80",
}: {
  src?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // ── Program ──────────────────────────────────────────────────
    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER,   VERT));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    // ── Geometry: full-screen quad ────────────────────────────────
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // ── Uniforms ──────────────────────────────────────────────────
    const uRes    = gl.getUniformLocation(program, "u_resolution");
    const uMouse  = gl.getUniformLocation(program, "u_mouse");
    const uTime   = gl.getUniformLocation(program, "u_time");
    const uHover  = gl.getUniformLocation(program, "u_hover");
    const uTex    = gl.getUniformLocation(program, "u_texture");
    const uAspect = gl.getUniformLocation(program, "u_imageAspect");

    // ── Texture ───────────────────────────────────────────────────
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imageAspect = 1.0;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageAspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.src = src;

    // ── Mouse state ───────────────────────────────────────────────
    let targetX = 0.5, targetY = 0.5;
    let mouseX  = 0.5, mouseY  = 0.5;
    let targetHover = 0, hover = 0;

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      targetX = (e.clientX - r.left)  / r.width;
      targetY = 1.0 - (e.clientY - r.top) / r.height;
    };
    const onEnter = () => { targetHover = 1; };
    const onLeave = () => { targetHover = 0; };

    container.addEventListener("pointermove",  onMove);
    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointerleave", onLeave);

    // ── Resize ────────────────────────────────────────────────────
    const dpr = Math.min(devicePixelRatio, 2);

    const resize = () => {
      canvas.width  = container.offsetWidth  * dpr;
      canvas.height = container.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ── Render loop ───────────────────────────────────────────────
    const t0 = performance.now();

    const render = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;
      hover  += (targetHover - hover) * 0.07;

      gl.uniform2f(uRes,    canvas.width, canvas.height);
      gl.uniform2f(uMouse,  mouseX, mouseY);
      gl.uniform1f(uTime,   (performance.now() - t0) / 1000);
      gl.uniform1f(uHover,  hover);
      gl.uniform1i(uTex,    0);
      gl.uniform1f(uAspect, imageAspect);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("pointermove",  onMove);
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
