import HeroSection from "@/components/sections/HeroSection";
import TextScrollReveal from "@/components/sections/TextScrollReveal";
import TrustLogos from "@/components/sections/TrustLogos";
import JourneySection from "@/components/sections/JourneySection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProductCardInteraction from "@/components/sections/ProductCardInteraction";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="w-full relative z-10 flex flex-col bg-background selection:bg-white selection:text-black">
      <HeroSection />
      <TextScrollReveal />
      {/* <TrustLogos /> */}
      <JourneySection />
      <ServicesGrid />
      <ProductCardInteraction />
      <FeaturedWork />
      <Testimonials />
      <Footer />
    </main>
  );
}
