"use client";

import { useParams } from "next/navigation";
import DarkVeil from "@/components/DarkVeil";
import ClickSpark from "@/components/ClickSpark";
import { teamData } from "@/lib/teamData";
import { getMemberPhotoPath } from "@/lib/memberPhotoMap";
import { IconBrandLinkedin, IconBrandInstagram, IconArrowUpRight } from "@tabler/icons-react";
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
import { useState } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Team", link: "/#team" },
  { name: "Events", link: "/events" },
  { name: "Contact", link: "/#contact" },
];

const getRoleColor = (role: string) => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes("lead") || roleLower.includes("head")) {
    return "bg-purple-500/20 border-purple-500/30 text-purple-300";
  } else if (roleLower.includes("associate")) {
    return "bg-blue-500/20 border-blue-500/30 text-blue-300";
  } else {
    return "bg-white/10 border-white/20 text-white/80";
  }
};

export default function DomainTeamPage() {
  const params = useParams();
  const domainId = params.domain as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle "mark" -> "mark" mapping (the URL uses "mark" but data uses "mark")
  const team = teamData[domainId];

  if (!team) {
    return (
      <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
        <div className="relative w-full min-h-screen bg-black">
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
          <div className="relative z-10 flex items-center justify-center min-h-screen text-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Domain Not Found</h1>
              <a href="/" className="text-white/70 hover:text-white">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </ClickSpark>
    );
  }

  // Group members by role
  // For Core team, ensure Head Lead comes first, then all Domain Leads grouped together
  const groupedMembers = team.members.reduce((acc, member) => {
    // For Core team, group all Domain Leads together (except Head Lead which stays separate)
    const roleKey = domainId === "core" && member.role === "Domain Leads" ? "Domain Leads" : member.role;
    if (!acc[roleKey]) {
      acc[roleKey] = [];
    }
    acc[roleKey].push(member);
    return acc;
  }, {} as Record<string, typeof team.members>);

  // Sort roles to ensure proper order: Head Lead/Operations Head first, then Domain Leads, then others
  const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
    // Head Lead or Operations Head comes first
    if (a === "Head Lead" || a === "Operations Head") return -1;
    if (b === "Head Lead" || b === "Operations Head") return 1;
    // Domain Leads comes second
    if (a === "Domain Leads") return -1;
    if (b === "Domain Leads") return 1;
    // Associate comes before Member
    if (a === "Associate" && b === "Member") return -1;
    if (b === "Associate" && a === "Member") return 1;
    return 0;
  });

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

        {/* Team Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
          <div className="w-full max-w-5xl mx-auto">
            {/* Domain Title */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {team.name} Team
              </h1>
              <p className="text-xl text-white/70">
                {domainId === "core" 
                  ? "Meet the pillars of the Developer Student Community." 
                  : `Meet the members of our ${team.name} domain`}
              </p>
            </div>

            {/* Team Members by Role */}
            <div className="space-y-8">
              {sortedRoles.map((role) => {
                const members = groupedMembers[role];
                const isImportantRole = role === "Head Lead" || role === "Operations Head";
                return (
                <div key={role} className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    {role}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {members.map((member, index) => (
                      <div
                        key={`${member.name}-${index}`}
                        className="p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 flex flex-col"
                        style={{
                          background: "linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: `
                            0 8px 32px rgba(0, 0, 0, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.05)
                          `,
                        }}
                      >
                        <div className="flex flex-col h-full group">
                          <div className="w-full h-64 md:h-80 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
                            <img
                              src={getMemberPhotoPath(member.name)}
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                // Fallback to initial if image doesn't exist
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const initialSpan = parent.querySelector('.member-initial');
                                  if (initialSpan) {
                                    (initialSpan as HTMLElement).style.display = 'block';
                                  }
                                }
                              }}
                            />
                            <span className="text-6xl font-bold text-purple-300 member-initial absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                            
                            {/* Social Media Icons - Appear on Hover */}
                            {(member.linkedin || member.instagram) && (
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                {member.linkedin && (
                                  <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-blue-600 hover:scale-110 hover:shadow-lg group/link"
                                    aria-label={`${member.name}'s LinkedIn`}
                                  >
                                    <IconBrandLinkedin size={20} className="text-gray-900 group-hover/link:text-white transition-colors" />
                                  </a>
                                )}
                                {member.instagram && (
                                  <a
                                    href={member.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:scale-110 hover:shadow-lg group/link"
                                    aria-label={`${member.name}'s Instagram`}
                                  >
                                    <IconBrandInstagram size={20} className="text-gray-900 group-hover/link:text-white transition-colors" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}

