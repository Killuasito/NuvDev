"use client";

import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import ClienteCTA from "./ClienteCTA";

export default function HomeWrapper() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <ClienteCTA />
    </>
  );
}
