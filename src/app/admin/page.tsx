"use client";
import { useState, useRef } from "react";

export default function AdminUpload() {
  const [uploads, setUploads] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setLoading(true);
    setError("");

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (res.ok) {
        setUploads((prev) => [{ name: file.name, url: data.url }, ...prev]);
      } else {
        setError(data.error ?? "Upload failed");
      }
    }

    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Photo Upload</h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Upload photos and copy their URLs into the site components.</p>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #333",
            borderRadius: 12,
            padding: "48px 24px",
            cursor: "pointer",
            background: loading ? "#111" : "#0f0f0f",
            transition: "background 0.2s",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          {loading ? (
            <span style={{ color: "#888" }}>Uploading…</span>
          ) : (
            <>
              <span style={{ fontSize: 40, marginBottom: 12 }}>+</span>
              <span style={{ color: "#aaa" }}>Tap to choose photos</span>
              <span style={{ color: "#555", fontSize: 13, marginTop: 4 }}>JPG · PNG · WebP · HEIC</span>
            </>
          )}
        </label>

        {error && (
          <p style={{ color: "#ff4444", marginTop: 16 }}>{error}</p>
        )}

        {uploads.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Uploaded</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {uploads.map((u, i) => (
                <div key={i} style={{ background: "#111", borderRadius: 10, padding: 16 }}>
                  <img src={u.url} alt={u.name} style={{ width: "100%", borderRadius: 8, marginBottom: 12, objectFit: "cover", maxHeight: 220 }} />
                  <p style={{ fontSize: 13, color: "#888", marginBottom: 8, wordBreak: "break-all" }}>{u.name}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(u.url)}
                    style={{
                      background: "#fff",
                      color: "#000",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Copy URL
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
