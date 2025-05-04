// src/pages/Home.jsx
import React from 'react';
import Navbar from '../layout/Navbar';
import Hero from './Hero';
// import {
//   Navbar,
//   Hero,
//   Experience,
//   Tech,
//   Works,
//   Feedbacks,
//   Contact,
//   StarsCanvas,
// } from './';

export default function Home() {
  return (
    <div className="bg-primary relative z-0">
      {/* Hero Section with Navbar */}
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Navbar />
        <Hero />
      </div>

      {/* Main Content Sections */}
      {/* <Experience />
      <Tech />
      <Works />
      <Feedbacks /> */}

      {/* Contact & Canvas */}
      {/* <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div> */}
    </div>
  );
}

