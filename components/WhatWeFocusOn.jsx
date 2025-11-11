"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconCalendarEvent, IconUsersGroup, IconSchool, IconCode, IconTrophy } from "@tabler/icons-react";

const initiatives = [
  {
    icon: IconCalendarEvent,
    title: "Flagship Events",
    description: "Organize large-scale events that bring together innovative minds to collaborate and compete.",
    glowColor: "from-purple-500/20 via-violet-500/20 to-blue-500/20",
    borderGlow: "rgba(168, 85, 247, 0.4)",
  },
  {
    icon: IconUsersGroup,
    title: "Knowledge Transfer Sessions",
    description: "Conduct insightful sessions that empower members to share and learn from each other.",
    glowColor: "from-blue-500/20 via-cyan-500/20 to-purple-500/20",
    borderGlow: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: IconSchool,
    title: "Workshops & Seminars",
    description: "Facilitate learning opportunities with expert-led sessions and interactive experiences.",
    glowColor: "from-violet-500/20 via-purple-500/20 to-pink-500/20",
    borderGlow: "rgba(139, 92, 246, 0.4)",
  },
  {
    icon: IconCode,
    title: "Hands-on Experience",
    description: "Encourage real-world problem-solving through projects, labs, and live challenges.",
    glowColor: "from-cyan-500/20 via-blue-500/20 to-violet-500/20",
    borderGlow: "rgba(6, 182, 212, 0.4)",
  },
  {
    icon: IconTrophy,
    title: "Hackathon Growth",
    description: "Drive technical growth and innovation through participation in high-energy hackathons.",
    glowColor: "from-yellow-500/20 via-amber-500/20 to-orange-500/20",
    borderGlow: "rgba(234, 179, 8, 0.4)",
  },
];

export default function WhatWeFocusOn() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsInView(true);
            setScrollLocked(true);
          } else {
            setIsInView(false);
            // Delay unlocking to prevent immediate scroll-through
            setTimeout(() => {
              if (!entry.isIntersecting || entry.intersectionRatio < 0.3) {
                setScrollLocked(false);
              }
            }, 100);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!scrollLocked || !isInView) return;

    const section = sectionRef.current;
    if (!section) return;

    let lockedScrollPosition = 0;
    let isLockActive = false;

    const lockScrollPosition = () => {
      const rect = section.getBoundingClientRect();
      // Lock when section is centered in viewport (top near 0, bottom near viewport height)
      const sectionCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      
      if (Math.abs(sectionCenter - viewportCenter) < 100) {
        if (!isLockActive) {
          lockedScrollPosition = window.pageYOffset;
          isLockActive = true;
        }
      } else {
        isLockActive = false;
      }
    };

    const handleWheel = (e) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      const isSectionCentered = Math.abs(sectionCenter - viewportCenter) < 100;
      
      if (isSectionCentered) {
        // Completely prevent scrolling when section is centered
        e.preventDefault();
        e.stopPropagation();
        
        // Force scroll back to locked position immediately
        requestAnimationFrame(() => {
          window.scrollTo({
            top: lockedScrollPosition,
            behavior: "auto",
          });
        });
      } else {
        // Allow scrolling when not centered, but lock when it reaches center
        lockScrollPosition();
      }
    };

    const handleTouchMove = (e) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      const isSectionCentered = Math.abs(sectionCenter - viewportCenter) < 100;
      
      if (isSectionCentered) {
        e.preventDefault();
        e.stopPropagation();
        
        requestAnimationFrame(() => {
          window.scrollTo({
            top: lockedScrollPosition,
            behavior: "auto",
          });
        });
      } else {
        lockScrollPosition();
      }
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      const isSectionCentered = Math.abs(sectionCenter - viewportCenter) < 100;
      
      if (isSectionCentered && isLockActive) {
        // Immediately snap back if scroll position changed
        if (Math.abs(window.pageYOffset - lockedScrollPosition) > 2) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: lockedScrollPosition,
              behavior: "auto",
            });
          });
        }
      } else {
        lockScrollPosition();
      }
    };

    // Initialize lock position
    lockScrollPosition();

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollLocked, isInView]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative flex items-center justify-center py-20 px-4 md:px-8"
      style={{
        height: "300vh", // Large height to create scroll lock effect
      }}
    >
      {/* Sticky container that locks in place */}
      <div className="sticky top-0 w-full min-h-screen flex items-center justify-center z-10">
        <div className="w-full max-w-7xl mx-auto z-10">
          {/* Header Section */}
          <div className="mb-16 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
              {/* Left Side - Sub-label and Heading */}
              <div className="flex-1">
                <p className="text-sm md:text-base text-white/60 uppercase tracking-wider mb-4 font-medium">
                  [ OUR INITIATIVES ]
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  What We Focus On
                </h2>
              </div>
              
              {/* Right Side - Description */}
              <div className="flex-1 flex items-center">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-lg">
                  We create impactful experiences through events, workshops, and collaborative learning that inspire innovation and technical excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid - 2 cards first row, 3 cards second row */}
          <div 
            className="grid gap-6 md:gap-8"
            style={{
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            {/* First Row - 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {initiatives.slice(0, 2).map((initiative, index) => {
                const IconComponent = initiative.icon;
                
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card Container */}
                    <div
                      className="relative h-full p-6 md:p-8 rounded-2xl backdrop-blur-sm"
                      style={{
                        background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.4),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          0 0 0 1px rgba(255, 255, 255, 0.05)
                        `,
                      }}
                    >
                      {/* Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{
                          background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))`,
                          filter: "blur(20px)",
                        }}
                      />
                      
                      {/* Top-left Glow Border */}
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${initiative.borderGlow} 0%, transparent 50%)`,
                          clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                      />

                      {/* Icon */}
                      <div className="relative mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30">
                          <IconComponent 
                            className="w-7 h-7 md:w-8 md:h-8 text-purple-400 group-hover:text-violet-300 transition-colors duration-300" 
                          />
                        </div>
                        {/* Icon Glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                          style={{
                            background: `radial-gradient(circle, ${initiative.borderGlow} 0%, transparent 70%)`,
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors duration-300">
                        {initiative.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {initiative.description}
                      </p>

                      {/* Bottom-right Accent */}
                      <div
                        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at bottom right, ${initiative.borderGlow}, transparent 70%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Second Row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {initiatives.slice(2, 5).map((initiative, index) => {
                const IconComponent = initiative.icon;
                const actualIndex = index + 2;
                
                return (
                  <motion.div
                    key={actualIndex}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: actualIndex * 0.1 }}
                  >
                    {/* Card Container */}
                    <div
                      className="relative h-full p-6 md:p-8 rounded-2xl backdrop-blur-sm"
                      style={{
                        background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.4),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          0 0 0 1px rgba(255, 255, 255, 0.05)
                        `,
                      }}
                    >
                      {/* Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                        style={{
                          background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))`,
                          filter: "blur(20px)",
                        }}
                      />
                      
                      {/* Top-left Glow Border */}
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${initiative.borderGlow} 0%, transparent 50%)`,
                          clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                      />

                      {/* Icon */}
                      <div className="relative mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30">
                          <IconComponent 
                            className="w-7 h-7 md:w-8 md:h-8 text-purple-400 group-hover:text-violet-300 transition-colors duration-300" 
                          />
                        </div>
                        {/* Icon Glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                          style={{
                            background: `radial-gradient(circle, ${initiative.borderGlow} 0%, transparent 70%)`,
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors duration-300">
                        {initiative.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                        {initiative.description}
                      </p>

                      {/* Bottom-right Accent */}
                      <div
                        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at bottom right, ${initiative.borderGlow}, transparent 70%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
