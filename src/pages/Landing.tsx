import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import JobExplore from "../components/sections/JobExplore";
import Layout from "../components/layout/Layout";
import HowItWorks from "../components/sections/HowItWorks";
import Cta from "../components/sections/Cta";

const Landing: React.FC = () => {
  return (
    <>
      <Layout>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <JobExplore />
        <Cta />
      </Layout>
    </>
  );
};

export default Landing;
