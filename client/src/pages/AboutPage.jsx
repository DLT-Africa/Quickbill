import React from "react";
import NavBar from "../components/NavBar";
import AboutUsHero from "../components/AboutUsHero";
import AboutUsTeam from "../components/AboutUsTeam";
import Footer from "../components/Footer";


const AboutPage = () => {
  return (
    <>
      <NavBar  position={"sticky"} zIndex={9999} top={0} />
      <AboutUsHero />
      <AboutUsTeam />
      <Footer />
    </>
  );
};

export default AboutPage;
