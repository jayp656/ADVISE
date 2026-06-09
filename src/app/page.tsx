import Nav from "@/components/Nav";
import SectionHero from "@/components/SectionHero";
import AmbientScene3D from "@/components/AmbientScene3D";
import SectionOpportunities from "@/components/SectionOpportunities";
import SectionStrategy from "@/components/SectionStrategy";
import SectionInterior from "@/components/SectionInterior";
import SectionInteriorDesign from "@/components/SectionInteriorDesign";
import ProjectSpread from "@/components/ProjectSpread";
import HorizontalGallery3D from "@/components/HorizontalGallery3D";
import SectionNeighborhood from "@/components/SectionNeighborhood";
import CityScapeSplit from "@/components/CityScapeSplit";
import SectionCityLights from "@/components/SectionCityLights";
import SectionDiscovery from "@/components/SectionDiscovery";
import SectionCareers from "@/components/SectionCareers";
import SectionFinalMoment from "@/components/SectionFinalMoment";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main>
      {/* Global atmosphere */}
      <FilmGrain />
      <CustomCursor />
      <Nav />

      {/* Scene 1: The Property */}
      <SectionHero />

      {/* Scene 2: The Reveal — Three.js architectural space */}
      <AmbientScene3D />

      {/* Scene 3: ADU Opportunities */}
      <SectionOpportunities />

      {/* Scene 3.5: The Summit Lot Difference */}
      <SectionStrategy />

      {/* Scene 4: The Finished Interior */}
      <SectionInterior />

      {/* Scene 4.5: Interior Design — rental optimization */}
      <SectionInteriorDesign />

      {/* Scene 5: Project spread — before / after / transformation */}
      <ProjectSpread />

      {/* Scene 5: 3D Horizontal Gallery — every unique build */}
      <HorizontalGallery3D />

      {/* Scene 6: The Neighborhood */}
      <SectionNeighborhood />

      {/* Scene 6.5: City Magazine Spread */}
      <CityScapeSplit />

      {/* Scene 7: City Scale */}
      <SectionCityLights />

      {/* Scene 8: Discovery Engine */}
      <SectionDiscovery />

      {/* Scene 8.5: Careers */}
      <SectionCareers />

      {/* Scene 9: The Moment */}
      <SectionFinalMoment />

      <Footer />
    </main>
  );
}
