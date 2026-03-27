import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ComparisonSection from "@/components/ComparisonSection";
import ContrastSection from "@/components/ContrastSection";
import ServicesSection from "@/components/ServicesSection";
import LocalSection from "@/components/LocalSection";
import ProofSection from "@/components/ProofSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ShowcaseSection />
        <ComparisonSection />
        <ContrastSection />
        <ServicesSection />
        <LocalSection />
        <ProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}