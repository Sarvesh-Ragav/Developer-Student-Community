"use client";

import Link from "next/link";

const teamSections = {
  top: [
    { name: "App", label: "App Development", domain: "app.dscsvce.com", image: "/team/app.png" },
    { name: "Web", label: "Web Development", domain: "web.dscsvce.com", image: "/team/web.png" },
    { name: "ML", label: "Machine Learning", domain: "ml.dscsvce.com", image: "/team/ml.png" },
  ],
  center: { name: "Core", label: "Core", domain: "core.dscsvce.com", image: "/team/core.png" },
  bottom: [
    { name: "Ops", label: "Operations", domain: "ops.dscsvce.com", image: "/team/ops.png" },
    { name: "Mark", label: "Marketing", domain: "mark.dscsvce.com", image: "/team/mark.png" },
    { name: "Prob", label: "Problem Solving", domain: "prob.dscsvce.com", image: "/team/prob.png" },
  ],
};

export default function MeetTheTeam() {
  return (
    <section
      id="team"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8"
    >
      <div className="w-full max-w-7xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Meet the Team
          </h2>
        </div>

        {/* Team Grid Layout */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Top Row - 3 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
            {teamSections.top.map((section, index) => (
              <Link
                key={index}
                href={`/team/${section.name.toLowerCase()}`}
                className="aspect-[4/3] rounded-2xl overflow-hidden relative backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05),
                    0 0 0 1px rgba(255, 255, 255, 0.03)
                  `,
                }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 overflow-hidden">
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.label}
                      className="w-full h-full object-cover object-center"
                      style={{ minWidth: '100%', minHeight: '100%' }}
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-violet-500/10 ${section.image ? 'hidden' : ''}`}
                  >
                    <svg
                      className="w-24 h-24 text-purple-400/30"
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
                </div>
              </Link>
            ))}
          </div>

          {/* Center - Core Box (reduced size) */}
          <div className="w-full max-w-5xl mx-auto">
            <Link
              href={`/team/${teamSections.center.name.toLowerCase()}`}
              className="aspect-[21/9] rounded-2xl overflow-hidden relative backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 block"
              style={{
                background: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: `
                  0 12px 48px rgba(0, 0, 0, 0.4),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 0 0 1px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {/* Image Background */}
              <div className="absolute inset-0 overflow-hidden">
                {teamSections.center.image ? (
                  <img
                    src={teamSections.center.image}
                    alt={teamSections.center.label}
                    className="w-full h-full object-cover object-center"
                    style={{ minWidth: '100%', minHeight: '100%' }}
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-violet-500/10 ${teamSections.center.image ? 'hidden' : ''}`}
                >
                  <svg
                    className="w-32 h-32 text-purple-400/30"
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
              </div>
            </Link>
          </div>

          {/* Bottom Row - 3 boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto">
            {teamSections.bottom.map((section, index) => (
              <Link
                key={index}
                href={`/team/${section.name.toLowerCase()}`}
                className="aspect-[4/3] rounded-2xl overflow-hidden relative backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05),
                    0 0 0 1px rgba(255, 255, 255, 0.03)
                  `,
                }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 overflow-hidden">
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.label}
                      className="w-full h-full object-cover object-center"
                      style={{ minWidth: '100%', minHeight: '100%' }}
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-violet-500/10 ${section.image ? 'hidden' : ''}`}
                  >
                    <svg
                      className="w-24 h-24 text-purple-400/30"
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

