"use client";

import { Event, EventStatus } from "@/app/events/page";

interface EventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const getStatusColor = (status: EventStatus) => {
  switch (status) {
    case "coming":
      return "bg-blue-500/20 border-blue-500/30 text-blue-300";
    case "ongoing":
      return "bg-green-500/20 border-green-500/30 text-green-300";
    case "completed":
      return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    default:
      return "bg-gray-500/20 border-gray-500/30 text-gray-300";
  }
};

const getStatusLabel = (status: EventStatus) => {
  switch (status) {
    case "coming":
      return "Coming Soon";
    case "ongoing":
      return "Ongoing";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

const sortEventsByStatus = (events: Event[]): Event[] => {
  const statusOrder: Record<EventStatus, number> = {
    ongoing: 0,
    coming: 1,
    completed: 2,
  };

  return [...events].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });
};

const groupEventsByAcademicYear = (events: Event[]): Record<string, Event[]> => {
  const grouped: Record<string, Event[]> = {};
  
  events.forEach((event) => {
    const year = event.academicYear || "Other";
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(event);
  });

  // Sort years in reverse order (most recent first)
  const sortedYears = Object.keys(grouped).sort((a, b) => {
    // Extract the start year for comparison
    const yearA = parseInt(a.split('-')[0]);
    const yearB = parseInt(b.split('-')[0]);
    return yearB - yearA;
  });

  const sortedGrouped: Record<string, Event[]> = {};
  sortedYears.forEach((year) => {
    sortedGrouped[year] = sortEventsByStatus(grouped[year]);
  });

  return sortedGrouped;
};

export default function EventsList({ events, onEventClick }: EventsListProps) {
  const groupedEvents = groupEventsByAcademicYear(events);
  const withBasePath = (p: string | undefined) => {
    if (!p) return p;
    if (/^https?:\/\//i.test(p)) return p;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (p.startsWith("/")) return `${base}${p}`;
    return `${base}/${p}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            All Events
          </h1>
          <p className="text-xl text-white/70">
            Discover past, ongoing, and upcoming events
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {(["ongoing", "coming", "completed"] as EventStatus[]).map((status) => {
            const count = events.filter((e) => e.status === status).length;
            return (
              <div
                key={status}
                className={`px-4 py-2 rounded-lg border ${getStatusColor(status)} text-sm font-medium`}
              >
                {getStatusLabel(status)} ({count})
              </div>
            );
          })}
        </div>

        {/* Event Cards by Academic Year */}
        <div className="space-y-16 md:space-y-20">
          {Object.entries(groupedEvents).map(([academicYear, yearEvents]) => (
            <div key={academicYear} className="space-y-8">
              {/* Academic Year Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Academic Year {academicYear}
                </h2>
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"></div>
              </div>

              {/* Events for this academic year */}
              <div className="space-y-8 md:space-y-12">
                {yearEvents.map((event, index) => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="cursor-pointer flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
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
              {/* Left Side - Event Details */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3">
                  <p className="text-sm md:text-base text-white/40 uppercase tracking-wider font-medium">
                    {event.number}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}
                  >
                    {getStatusLabel(event.status)}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {event.title}
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/80"
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    {event.tag}
                  </span>
                  {event.date && (
                    <span className="text-sm text-white/60">
                      📅 {event.date}
                    </span>
                  )}
                  {event.location && (
                    <span className="text-sm text-white/60">
                      📍 {event.location}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-white/50 italic">
                  Click to view details →
                </p>
              </div>

              {/* Right Side - Image / Placeholder */}
              <div className="flex-1">
                <div
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(30, 27, 75, 0.5) 0%, rgba(17, 24, 39, 0.5) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {event.image ? (
                    <img
                      src={withBasePath(event.image)}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the image fails to load, fall back to placeholder
                        e.currentTarget.style.display = "none";
                        const placeholder = e.currentTarget.parentElement?.querySelector(
                          ".event-card-placeholder"
                        );
                        if (placeholder) {
                          (placeholder as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                  ) : null}

                  <div
                    className={`event-card-placeholder w-full h-full flex items-center justify-center ${
                      event.image ? "hidden" : ""
                    }`}
                  >
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
              </div>
            </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-white/60">No events found</p>
          </div>
        )}
      </div>
    </section>
  );
}

