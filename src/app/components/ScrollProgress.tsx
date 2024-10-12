"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [filledHeights, setFilledHeights] = useState([0, 0, 0]);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const sectionCount = 3;
  const sectionHeight = 50; // Adjust this based on your page height

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollDirection(position > scrollPosition ? 'down' : 'up');
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const calculateProgress = (divStart: number, divEnd: number) => {
    if (scrollPosition < divStart) return 0;
    if (scrollPosition > divEnd) return 100;
    return ((scrollPosition - divStart) / (divEnd - divStart)) * 100;
  };

  useEffect(() => {
    // Update active section based on scroll position
    for (let i = 0; i < sectionCount; i++) {
      const divStart = i * sectionHeight;
      const divEnd = (i + 1) * sectionHeight;
      const progress = calculateProgress(divStart, divEnd);
      
      // Set active section based on scroll position
      if (progress > 0 && progress < 100) {
        setActiveSection(i);
      }
      
      // Update the filled heights over time
      setFilledHeights((prevHeights) => {
        const newHeights = [...prevHeights];
        if (progress > newHeights[i]) {
          newHeights[i] = Math.min(progress, 100);
        } else {
          newHeights[i] = Math.max(progress, 0);
        }
        return newHeights;
      });
    }
  }, [scrollPosition]);

  // Framer Motion variants for animations
  const contentVariants = {
    hidden: { opacity: 0, y: scrollDirection === 'down' ? 100 : -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>Solutions with Scroll Progress</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex items-center justify-center min-h-[200px] bg-white">
        <div className="max-w-5xl mx-auto p-8 flex">

          {/* Left Side: Progress bars */}
          <div className="flex flex-col items-center pr-24">
            {[0, 1, 2].map((index) => {
              const divStart = index * sectionHeight;
              const divEnd = (index + 1) * sectionHeight;
              return (
                <div className="w-2 h-[250px] bg-gray-300 relative mt-8" key={index}>
                  <motion.div
                    className="bg-blue-800 w-full absolute left-0"
                    style={{ height: `${filledHeights[index]}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${filledHeights[index]}%` }}
                    transition={{ duration: 0.9 }} // Adjust duration for smoother filling
                  />
                </div>
              );
            })}
          </div>

          {/* Right Side: Main Content */}
          <motion.div
            key={activeSection}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{ duration: 0.9 }}
            className="flex flex-col md:flex-row items-center"
          >
            <div className="flex flex-col items-start max-w-2xl">
              <div className="relative">
                <div className="absolute -left-8 top-0 h-16 w-2 bg-pink-500"></div>
                <h1 className="text-4xl font-extrabold text-black relative z-10">
                  Tailored Products for Every Stage of Development
                </h1>
                <h1 className="text-5xl font-bold text-gray-200 absolute top-[-20px] left-0 z-0 w-full">
                  SOLUTIONS
                </h1>
              </div>

              {/* Main Section Content */}
              {activeSection === 0 && (
                <div className="flex flex-col mt-4">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    transition={{ duration: 0.9 }}
                    className="flex-1"
                  >
                    <h2 className="text-2xl font-bold text-black">Classic 360 Degrees</h2>
                    <p className="text-gray-600 mt-2">
                      A fully digitalized platform offering customizable workflows, automatic notifications, and easy integration. Perfect for companies seeking to optimize 360-degree assessments for skill and competency development.
                    </p>
                    <div className="flex mt-8 space-x-4">
                      <div className="bg-white rounded-lg p-4 text-left shadow-md w-56">
                        <p className="text-3xl font-bold text-black">95%</p>
                        <p className="text-gray-600">faster implementation of feedback processes.</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-left shadow-md w-56">
                        <p className="text-3xl font-bold text-black">80%</p>
                        <p className="text-gray-600">of users report better alignment with talent management goals.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Sections for other activeSections */}
              {activeSection === 1 && <SectionContent />}
              {activeSection === 2 && <SectionContent />}
            </div>

            {/* Right Side Image */}
            <div className="ml-0 md:ml-16 mt-8 md:mt-0">
              <div className="bg-gray-300 rounded-lg w-[500px] h-[400px] flex items-center justify-center shadow-md">
                <i className="fas fa-image text-6xl text-gray-500"></i>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// SectionContent Component to reduce repetition
const SectionContent = () => (
  <div className="flex flex-col mt-4">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.9 }}
      className="flex-1"
    >
      <h2 className="text-2xl font-bold text-black">Classic 360 Degrees</h2>
      <p className="text-gray-600 mt-2">
        A fully digitalized platform offering customizable workflows, automatic notifications, and easy integration.
      </p>
      <div className="flex mt-8 space-x-4">
        <div className="bg-white rounded-lg p-4 text-left shadow-md w-56">
          <p className="text-3xl font-bold text-black">95%</p>
          <p className="text-gray-600">faster implementation of feedback processes.</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-left shadow-md w-56">
          <p className="text-3xl font-bold text-black">80%</p>
          <p className="text-gray-600">of users report better alignment with talent management goals.</p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default ScrollProgress;
