"use client";

import { useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import ClickSpark from "@/components/ClickSpark";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import WhatWeFocusOn from "@/components/WhatWeFocusOn";
import SeeOurWork from "@/components/SeeOurWork";
import MeetTheTeam from "@/components/MeetTheTeam";
import { IconArrowUpRight, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/Navbar";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Team", link: "#team" },
  { name: "Events", link: "/events" },
  { name: "Contact", link: "#contact" },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to send");
      }
      alert("Thanks! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <div className="relative w-full min-h-screen bg-black">
        {/* Background with DarkVeil */}
        <div className="fixed inset-0 w-full h-full pointer-events-none">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.02}
            scanlineIntensity={0}
            speed={1.5}
            scanlineFrequency={0}
            warpAmount={0.3}
            resolutionScale={1}
          />
        </div>
      
        {/* Navbar */}
        <Navbar className="fixed top-0 z-50">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={20} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/gdscsvce/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <IconBrandInstagram size={20} className="text-white" />
              </a>
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  className="text-white/80 hover:text-white/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin size={20} className="text-white" />
                </a>
                <a
                  href="https://www.instagram.com/gdscsvce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <IconBrandInstagram size={20} className="text-white" />
                </a>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center">
          <div className="text-center z-10 px-4 max-w-6xl">
            <div className="pointer-events-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white/90 mb-6 drop-shadow-lg leading-tight" style={{ fontFamily: 'var(--font-anonymous-pro)' }}>
                <span className="block sm:inline">DEVELOPER STUDENT COMMUNITY</span>
                <span className="block sm:inline">, SVCE</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/70 drop-shadow-md leading-relaxed max-w-3xl mx-auto">
                Step into our vibrant student community, where we foster a passion for technology and development to build powerful products and create impactful story
              </p>
            </div>
            <a 
              href="#community"
              className="mt-6 inline-block px-6 py-3 text-base font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-all duration-200 pointer-events-auto"
            >
              Join Community
              <IconArrowUpRight size={16} className="inline-block ml-1" />
            </a>
          </div>
        </section>

        {/* Who We Are Section with Pinned Scroll Animation */}
        <WhoWeAreSection />

        {/* What We Focus On Section */}
        <WhatWeFocusOn />

        {/* See Our Work in Action Section */}
        <SeeOurWork />

        {/* Meet the Team Section */}
        <MeetTheTeam />

        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
          <div className="w-full max-w-7xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <p className="text-sm md:text-base text-white/50 font-mono tracking-wider uppercase mb-4">
                  [CONTACT US]
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to join our{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    community
                  </span>{" "}
                  or want to be a{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    volunteer?
                  </span>{" "}
                  Hit us up
            </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  We're here to help you get started and answer any questions you might have.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://www.linkedin.com/company/svce-developer-student-community/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-600 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <IconBrandLinkedin size={24} className="text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/gdscsvce/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <IconBrandInstagram size={24} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl overflow-hidden relative backdrop-blur-md"
                  style={{
                    background: "linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(30, 27, 75, 0.5) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05),
                      0 0 0 1px rgba(255, 255, 255, 0.03)
                    `,
                  }}
                >
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="mail@site.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white/80 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                      />
                    </div>

                    {/* Terms Text */}
                    <p className="text-xs text-white/50">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-white/70 hover:text-white underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-white/70 hover:text-white underline">
                        Privacy Policy
                      </a>
                      .
                    </p>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all duration-200 hover:border-white/30"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClickSpark>
  );
}
