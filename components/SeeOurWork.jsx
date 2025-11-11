"use client";

import { motion } from "motion/react";

const events = [
  {
    number: "01",
    title: "Blueprints",
    description: "Our annual hackathon where ideas turn into innovation.",
    tag: "Hackathon",
  },
  {
    number: "02",
    title: "DPREP",
    description: "Aptitude and problem-solving marathon to sharpen logical skills and analytical thinking.",
    tag: "Aptitude",
  },
  {
    number: "03",
    title: "Visualizing Web Development",
    description: "Hands-on web development event exploring the latest front-end and AI-integrated technologies.",
    tag: "Web Development",
  },
];

export default function SeeOurWork() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">
              See Our Work in Action
            </span>
          </motion.h2>
        </div>

        {/* Event Cards */}
        <div className="space-y-8 md:space-y-12 mb-16">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-2xl backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05),
                  0 0 0 1px rgba(255, 255, 255, 0.03)
                `,
              }}
              initial={{ 
                opacity: 0, 
                y: 80,
                scale: 0.95,
                filter: "blur(20px) brightness(0.5)",
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                filter: "blur(0px) brightness(1)",
              }}
              viewport={{ once: false, margin: "-150px" }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94], // Sharp ease-out curve
                opacity: { duration: 0.6, ease: "easeOut" },
                filter: { duration: 0.7, ease: "easeOut" },
              }}
            >
              {/* Left Side - Event Details */}
              <motion.div
                className="flex-1 flex flex-col justify-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.15 + 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p className="text-sm md:text-base text-white/40 uppercase tracking-wider mb-2 font-medium">
                  {event.number}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {event.title}
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                  {event.description}
                </p>
                <span
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/80"
                  style={{
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {event.tag}
                </span>
              </motion.div>

              {/* Right Side - Image Box */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.15 + 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(17, 24, 39, 0.5) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-white/40">Image Placeholder</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.div
            className="relative inline-block rounded-lg p-[2px] group"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6))",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <a
              href="/events"
              className="relative flex items-center gap-2 px-8 py-4 text-lg font-medium text-white rounded-lg"
              style={{
                background: "rgba(17, 24, 39, 0.9)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span>Explore More Events</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            
            {/* Glow Effect on Hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
