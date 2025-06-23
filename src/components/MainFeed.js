import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CustomCursor from "./CustomCursor";
import FormLine from "./FormLine";
// import PerformanceSection from "./PerformanceSection";
import FuturisticOurTeam from "./FuturisticOurTeam";
import ProjectsSection from "./ProjectsSection";
import CompanyValuesSection from "./CompanyValuesSection";
import { GlobalStyles, ScrollToTop } from './scroll-components';
import { SpeedInsights } from "@vercel/speed-insights/react"
import PartnersSection from "./Parteners";
import Footer from "./Footer";

const MainFeed = () => {
  return (
    <div className="min-h-screen  bg-gray-900">
      <SpeedInsights/>
      <CustomCursor />
      <GlobalStyles />
      <ScrollToTop />
      <Navbar />
      {/* Main Content ! */}
      <main className="flex flex-col ">
        <section id="hero-section">
          <HeroSection />
        </section>
        <section id="features-section">
          <FeaturesSection />
        </section>
        {/* <section id="performance-section">
          <PerformanceSection />
        </section> */}
        <section className="pt-12" id="projects-section">
          <ProjectsSection />
        </section>
        <section id="company-values-section">
          <CompanyValuesSection />
        </section>
        <section id="team-section">
          <FuturisticOurTeam />
        </section>
        <section id="partners-section">
          <PartnersSection />
        </section>
        <section id="contact-section">
          <FormLine />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainFeed;
