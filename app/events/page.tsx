"use client";

import { useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import ClickSpark from "@/components/ClickSpark";
import EventsList from "@/components/EventsList";
import EventModal from "@/components/EventModal";
import AdminPanel from "@/components/AdminPanel";
import { IconArrowUpRight, IconArrowLeft, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
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

export type EventStatus = "coming" | "ongoing" | "completed";

export interface Event {
  id: string;
  number: string;
  title: string;
  description: string;
  detailedDescription?: string;
  tag: string;
  status: EventStatus;
  date?: string;
  location?: string;
  image?: string;
  academicYear: string;
  gallery?: string[];
  galleryPath?: string; // optional: folder to auto-discover images from
}

// Initial events data - this will be managed by AdminPanel later
const initialEvents: Event[] = [
  // Academic Year 2024-25 (Last Tenure)
  {
    id: "1",
    number: "01",
    title: "Blueprints",
    description: "Our annual hackathon where ideas turn into innovation.",
    detailedDescription: "GDSC Blueprints 2025 was a multi-phase national hackathon connecting academia and industry through real-world problem statements from companies like Siemens and Hyundai. Students advanced through idea submission, MVP development, and a 24-hour finale judged by industry experts. The event fostered innovation, teamwork, and technical excellence, equipping students with hands-on product development experience.",
    tag: "Hackathon",
    status: "completed",
    date: "March 14-15, 2025",
    location: "Multi Purpose Hall",
    image: "/events/blueprints/1.png",
    academicYear: "2024-25",
    gallery: [],
    galleryPath: "/events/blueprints",
  },
  {
    id: "2",
    number: "02",
    title: "DevCon",
    description: "Developer conference featuring talks, workshops, and networking opportunities.",
    detailedDescription: "The GDSC DEVCON Event, held on October 19, 2024, brought together second and third-year students to develop innovative startup ideas through guided brainstorming and mentorship. Teams created and presented pitch decks to alumni judges, receiving valuable feedback on feasibility and creativity. The event enhanced participants' problem-solving, teamwork, and communication skills while promoting innovation and real-world application.",
    tag: "Conference",
    status: "completed",
    date: "October 19, 2024",
    location: "Video and Function Hall",
    image: "/events/devcon/4.png",
    academicYear: "2024-25",
    gallery: [],
    galleryPath: "/events/devcon",
  },
  {
    id: "3",
    number: "03",
    title: "Visualizing Web Development",
    description: "Hands-on web development event exploring the latest front-end and AI-integrated technologies.",
    detailedDescription: "Held on September 27, 2024, this beginner-friendly workshop introduced second-year students to HTML, CSS, and JavaScript through a guided \"build your first website\" session. Using an interactive, analogy-based approach, participants created personal portfolio websites with real-time mentoring. The session enhanced foundational web development skills and inspired students to explore modern frameworks like React and Node.js.",
    tag: "Web Development",
    status: "completed",
    date: "September 27, 2024",
    location: "Placement Seminar Hall",
    image: "/events/visualizing-web/1.png",
    academicYear: "2024-25",
    gallery: [],
    galleryPath: "/events/visualizing-web",
  },
  // Academic Year 2025-26 (Current Tenure)
  {
    id: "4",
    number: "04",
    title: "DPREP",
    description: "Aptitude and problem-solving marathon to sharpen logical skills and analytical thinking.",
    detailedDescription: "Conducted from August 11–19, 2025, D-PREP was a structured readiness program focusing on DSA, analytical thinking, and coding interview skills. It included online sessions, problem-solving worksheets, hands-on HackerRank challenges, and an offline workshop. The initiative boosted participants' problem-solving confidence, teamwork, and placement readiness through continuous mentorship and practice.",
    tag: "Aptitude",
    status: "completed",
    date: "August 19, 2024",
    location: "Placement Seminar Hall",
    image: "/events/dprep/7.png",
    academicYear: "2025-26",
    gallery: [],
    galleryPath: "/events/dprep",
  },
  {
    id: "5",
    number: "05",
    title: "Visualizing Web Development",
    description: "Hands-on web development event exploring the latest front-end and AI-integrated technologies.",
    detailedDescription: "Held on September 16, 2025, this web cloning challenge encouraged creativity as students rebuilt and redesigned websites based on surprise themes. Top performers earned ChatGPT Go subscriptions for innovation and execution.",
    tag: "Web Development",
    status: "completed",
    date: "September 16, 2024",
    location: "CS Lab 8",
    image: "/events/visualizing-web-2025/2.png",
    academicYear: "2025-26",
    gallery: [],
    galleryPath: "/events/visualizing-web-2025",
  },
  {
    id: "6",
    number: "06",
    title: "Inauguration and Valedictory",
    description: "Ceremonial kickoff and closing celebrating our tenure's milestones and achievements.",
    detailedDescription: "A tenure-spanning celebration featuring the official inauguration and a grand valedictory ceremony. We highlighted key initiatives, thanked contributors, and set the vision for the year ahead. The event coincided with the DSC Inauguration & GDSC Valedictory, symbolizing a new era of student-led tech initiatives and leadership transition at SVCE.",
    tag: "Ceremony",
    status: "completed",
    date: "September 18, 2024",
    location: "Library Seminar Hall",
    image: "/events/inauguration-valedictory/1.png",
    academicYear: "2025-26",
    gallery: [],
    galleryPath: "/events/inauguration-valedictory",
  },
  {
    id: "7",
    number: "07",
    title: "Blueprints",
    description: "Our annual hackathon where ideas turn into innovation.",
    detailedDescription: "Join us for our annual hackathon where creative minds come together to build innovative solutions. This 48-hour event brings together developers, designers, and entrepreneurs to create amazing projects. Participants will have access to mentorship, workshops, and networking opportunities.",
    tag: "Hackathon",
    status: "coming",
    date: "March 2026",
    location: "Main Campus",
    academicYear: "2025-26",
  },
];

const navItems = [
  { name: "Home", link: "/" },
  { name: "Team", link: "/#team" },
  { name: "Events", link: "/events" },
  { name: "Contact", link: "/#contact" },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleStatusChange = (eventId: string, newStatus: EventStatus) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
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

        {/* Back Button */}
        <div className="fixed top-20 left-4 md:left-8 z-40">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm"
          >
            <IconArrowLeft size={16} />
            Back to Home
          </a>
        </div>

        {/* Events List */}
        <div className="relative z-10">
          <EventsList
            events={events}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Event Details Modal */}
        {isModalOpen && selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
          />
        )}

        {/* Admin Panel */}
        {showAdminPanel && (
          <AdminPanel
            events={events}
            onStatusChange={handleStatusChange}
            onClose={() => setShowAdminPanel(false)}
          />
        )}

        {/* Hidden Admin Button */}
        <button
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-4 right-4 z-50 text-xs text-white/20 hover:text-white/40 transition-colors duration-200 font-mono"
          style={{ fontSize: "10px" }}
          title="Admin Panel"
        >
          Admin
        </button>
      </div>
    </ClickSpark>
  );
}

