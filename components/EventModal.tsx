"use client";

import { Event } from "@/app/events/page";
import { IconX } from "@tabler/icons-react";
import EventGallery from "@/components/EventGallery";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
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

const getStatusLabel = (status: string) => {
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

export default function EventModal({ event, onClose }: EventModalProps) {
  const withBasePath = (p: string) => {
    if (!p) return p;
    if (/^https?:\/\//i.test(p)) return p;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (p.startsWith("/")) return `${base}${p}`;
    return `${base}/${p}`;
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-2xl backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
          >
            <IconX size={20} className="text-white" />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <p className="text-sm md:text-base text-white/40 uppercase tracking-wider font-medium">
                  {event.number}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}
                >
                  {getStatusLabel(event.status)}
                </span>
                <span
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/80"
                  style={{
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {event.tag}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {event.title}
              </h2>
            </div>

            {/* Description - moved to top */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">About This Event</h3>
              <p className="text-base text-white/70 leading-relaxed mb-4">
                {event.description}
              </p>
              {event.detailedDescription && (
                <p className="text-lg text-white/80 leading-relaxed">
                  {event.detailedDescription}
                </p>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.date && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-white/60 mb-1">Date</p>
                    <p className="text-lg text-white">📅 {event.date}</p>
                  </div>
                )}
                {event.location && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-white/60 mb-1">Location</p>
                    <p className="text-lg text-white">📍 {event.location}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Gallery */}
            {(event.gallery?.length ?? 0) > 0 ? (
              <EventGallery images={event.gallery} eventTitle={event.title} />
            ) : (
              // Auto-discover images from a base folder if provided
              event.galleryPath && (
                <EventGallery basePath={event.galleryPath} eventTitle={event.title} />
              )
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {event.status === "coming" && (
                <button
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium hover:from-purple-600 hover:to-violet-600 transition-all duration-200"
                >
                  Register Now
                </button>
              )}
              {event.status === "ongoing" && (
                <button
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                >
                  Join Event
                </button>
              )}
              {event.status === "completed" && (
                <button
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all duration-200"
                >
                  View Gallery
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

