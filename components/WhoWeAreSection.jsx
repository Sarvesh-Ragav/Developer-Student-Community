"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function WhoWeAreSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Community Driven - appears first, scrolls up from bottom edge
  const communityOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.28],
    [0, 1, 1, 0],
    { clamp: false }
  );
  const communityY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.28],
    [450, -100, -100, -160],
    { clamp: false }
  );
  const communityFilter = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.28],
    [
      "blur(25px) brightness(0.2)",
      "blur(0px) brightness(1)",
      "blur(0px) brightness(1)",
      "blur(12px) brightness(0.6)"
    ],
    { clamp: false }
  );
  const communityScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.18, 0.28],
    [0.8, 1, 1, 0.95],
    { clamp: false }
  );

  // 2. Open Source By Heart - appears second, scrolls up from bottom edge
  const openSourceOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [0, 1, 1, 0],
    { clamp: false }
  );
  const openSourceY = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [450, 200, 200, 150],
    { clamp: false }
  );
  const openSourceFilter = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [
      "blur(25px) brightness(0.2)",
      "blur(0px) brightness(1)",
      "blur(0px) brightness(1)",
      "blur(12px) brightness(0.6)"
    ],
    { clamp: false }
  );
  const openSourceScale = useTransform(
    scrollYProgress,
    [0.22, 0.32, 0.48, 0.58],
    [0.8, 1, 1, 0.95],
    { clamp: false }
  );

  // 3. Built By Students For Students - appears third
  const studentsOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.73, 0.83],
    [0, 1, 1, 0],
    { clamp: false }
  );
  const studentsY = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.73, 0.83],
    [450, -100, -100, -160],
    { clamp: false }
  );
  const studentsFilter = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.73, 0.83],
    [
      "blur(25px) brightness(0.2)",
      "blur(0px) brightness(1)",
      "blur(0px) brightness(1)",
      "blur(12px) brightness(0.6)"
    ],
    { clamp: false }
  );
  const studentsScale = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.73, 0.83],
    [0.8, 1, 1, 0.95],
    { clamp: false }
  );

  // 4. Bridge Gap Between Students And Industry Experts - appears fourth
  const bridgeOpacity = useTransform(
    scrollYProgress,
    [0.63, 0.73, 0.83, 0.93],
    [0, 1, 1, 0],
    { clamp: false }
  );
  const bridgeY = useTransform(
    scrollYProgress,
    [0.63, 0.73, 0.83, 0.93],
    [450, 200, 200, 150],
    { clamp: false }
  );
  const bridgeFilter = useTransform(
    scrollYProgress,
    [0.63, 0.73, 0.83, 0.93],
    [
      "blur(25px) brightness(0.2)",
      "blur(0px) brightness(1)",
      "blur(0px) brightness(1)",
      "blur(12px) brightness(0.6)"
    ],
    { clamp: false }
  );
  const bridgeScale = useTransform(
    scrollYProgress,
    [0.63, 0.73, 0.83, 0.93],
    [0.8, 1, 1, 0.95],
    { clamp: false }
  );

  // Enhanced central text with smooth scale and opacity
  const centralOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.83, 0.93],
    [1, 1, 1, 0],
    { clamp: false }
  );
  const centralScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.83, 0.93],
    [1, 1, 1, 0.96],
    { clamp: false }
  );
  const centralBlur = useTransform(
    scrollYProgress,
    [0, 0.08, 0.83, 0.93],
    ["blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"],
    { clamp: false }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full"
      style={{ height: "450vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Central pinned text with enhanced smooth animations */}
        <motion.h2
          className="text-6xl md:text-8xl font-semibold tracking-tight text-white/90 drop-shadow-lg z-20 text-center px-4"
          style={{
            opacity: centralOpacity,
            scale: centralScale,
            filter: centralBlur,
            willChange: "opacity, transform, filter",
          }}
        >
          Who We Are
        </motion.h2>

        {/* 1. Community Driven - positioned just above "Who We Are", scrolls up from bottom edge */}
        <motion.div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 z-10 text-center"
          style={{
            opacity: communityOpacity,
            y: communityY,
            filter: communityFilter,
            scale: communityScale,
            willChange: "opacity, transform, filter",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 1,
          }}
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-white/70 tracking-tight drop-shadow-md px-4">
            Community Driven
          </p>
        </motion.div>

        {/* 2. Open Source By Heart - positioned bottom-left */}
        <motion.div
          className="absolute bottom-[35%] left-[10%] md:left-[15%] z-10"
          style={{
            opacity: openSourceOpacity,
            y: openSourceY,
            filter: openSourceFilter,
            scale: openSourceScale,
            willChange: "opacity, transform, filter",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 1,
          }}
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-white/70 tracking-tight drop-shadow-md">
            Open Source By Heart
          </p>
        </motion.div>

        {/* 3. Built By Students For Students - positioned top-right */}
        <motion.div
          className="absolute top-[25%] right-[10%] md:right-[15%] z-10 text-right"
          style={{
            opacity: studentsOpacity,
            y: studentsY,
            filter: studentsFilter,
            scale: studentsScale,
            willChange: "opacity, transform, filter",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 1,
          }}
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-white/70 tracking-tight drop-shadow-md">
            Built By Students For Students
          </p>
        </motion.div>

        {/* 4. Bridge Gap Between Students And Industry Experts - positioned bottom-right, scrolls up from bottom edge */}
        <motion.div
          className="absolute bottom-[35%] right-[10%] md:right-[15%] z-10 max-w-xs md:max-w-md lg:max-w-lg text-right"
          style={{
            opacity: bridgeOpacity,
            y: bridgeY,
            filter: bridgeFilter,
            scale: bridgeScale,
            willChange: "opacity, transform, filter",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 1,
          }}
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-medium text-white/70 tracking-tight drop-shadow-md">
            Bridge Gap Between Students And Industry Experts
          </p>
        </motion.div>

      </div>
    </section>
  );
}
