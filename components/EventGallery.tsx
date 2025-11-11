"use client";

import { useState, useEffect } from "react";
import { IconX, IconZoomIn, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface EventGalleryProps {
  images?: string[];
  basePath?: string; // optional: auto-discover numbered images in this folder
  maxImagesToScan?: number; // optional: limit discovery attempts
  eventTitle: string;
}

export default function EventGallery({ images, basePath, maxImagesToScan = 24, eventTitle }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resolvedImages, setResolvedImages] = useState<string[]>(() => images ?? []);

  const withBasePath = (p: string) => {
    if (!p) return p;
    if (/^https?:\/\//i.test(p)) return p;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (p.startsWith("/")) return `${base}${p}`;
    return `${base}/${p}`;
  };
  const withoutBasePath = (p: string) => {
    if (!p) return p;
    if (/^https?:\/\//i.test(p)) return p;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (!base) return p;
    if (p.startsWith(base + "/")) return p.slice(base.length);
    if (p === base) return "/";
    return p;
  };
  const trySwapSrc = (img: HTMLImageElement) => {
    // Only attempt one swap per image element to avoid loops
    if ((img as any).__swapped) return;
    (img as any).__swapped = true;
    const current = img.getAttribute("src") || "";
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (base && current.startsWith(base + "/")) {
      img.src = withoutBasePath(current);
    } else {
      img.src = withBasePath(current);
    }
  };

  // Auto-discover images in a folder when images are not supplied
  useEffect(() => {
    let isCancelled = false;
    async function discover() {
      if (images && images.length > 0) {
        setResolvedImages(images.map(withBasePath));
        return;
      }
      if (!basePath) {
        setResolvedImages([]);
        return;
      }
      // Try manifest.json first to support arbitrary filenames on static hosts (e.g., GitHub Pages)
      try {
        const manifestUrlPrimary = withBasePath("/events/manifest.json");
        const manifestUrlFallback = "/events/manifest.json";
        let manifestRes = await fetch(manifestUrlPrimary, { cache: "no-store" });
        if (!manifestRes.ok) {
          manifestRes = await fetch(manifestUrlFallback, { cache: "no-store" });
        }
        if (manifestRes.ok) {
          const manifest = await manifestRes.json();
          const folder = basePath.replace(/^\/+|\/+$/g, "").split("/").pop();
          const files = folder ? (manifest?.folders?.[folder] as string[] | undefined) : undefined;
          if (files && files.length > 0) {
            // Build both primary and fallback URLs; prefer primary
            const urls = files.map((f) => withBasePath(`${basePath}/${f}`));
            if (!isCancelled) {
              setResolvedImages(urls);
            }
            return;
          }
        }
      } catch {
        // ignore and fallback to numbered probing
      }
      const extensions = [".png", ".jpg", ".jpeg", ".webp"];
      const discovered: string[] = [];
      // Try sequentially to respect hosting rate limits
      for (let i = 1; i <= maxImagesToScan; i++) {
        let foundForIndex = false;
        for (const ext of extensions) {
          const primary = withBasePath(`${basePath}/${i}${ext}`);
          const fallback = `${basePath}/${i}${ext}`;
          try {
            let res = await fetch(primary, { method: "HEAD", cache: "no-store" });
            if (!res.ok) {
              res = await fetch(fallback, { method: "HEAD", cache: "no-store" });
            }
            if (res.ok) {
              discovered.push(res.url.includes("/_next/") ? primary : (res.url.includes(fallback) ? fallback : primary));
              foundForIndex = true;
              break;
            }
          } catch {
            // ignore fetch errors and try next extension
          }
        }
        // Small optimization: if we didn't find the current index and we've already found at least 1,
        // and the previous index also failed, we can break early assuming contiguous numbering.
        if (!foundForIndex && i > 3 && discovered.length > 0) {
          // If last two attempts failed, break
          // Note: simple heuristic to avoid many HEADs on pages hosting
          const lastTried = i - 1;
          // no reliable state of previous failure kept; continue scanning a bit more instead
        }
      }
      if (!isCancelled) setResolvedImages(discovered);
    }
    discover();
    return () => {
      isCancelled = true;
    };
  }, [images, basePath, maxImagesToScan]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? resolvedImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(resolvedImages[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === resolvedImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(resolvedImages[newIndex]);
  };

  const openImage = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  if (!resolvedImages || resolvedImages.length === 0) {
    return null;
  }

  // Create an organized masonry layout with spatial awareness
  const getImageClass = (index: number, total: number) => {
    // Single image - full width, larger height
    if (total === 1) return "col-span-2 md:col-span-3 row-span-3";
    
    // Two images - side by side, equal size
    if (total === 2) {
      return "col-span-1 md:col-span-1 row-span-2";
    }
    
    // Three images - one large, two smaller
    if (total === 3) {
      if (index === 0) return "col-span-2 md:col-span-2 row-span-3";
      return "col-span-1 md:col-span-1 row-span-2";
    }
    
    // Four images - balanced grid
    if (total === 4) {
      if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
      if (index === 1) return "col-span-1 md:col-span-1 row-span-1";
      if (index === 2) return "col-span-1 md:col-span-1 row-span-1";
      return "col-span-2 md:col-span-2 row-span-1";
    }
    
    // Five images - organized pattern
    if (total === 5) {
      if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
      if (index === 1) return "col-span-1 md:col-span-1 row-span-1";
      if (index === 2) return "col-span-1 md:col-span-1 row-span-1";
      if (index === 3) return "col-span-1 md:col-span-1 row-span-1";
      return "col-span-1 md:col-span-1 row-span-1";
    }
    
    // Six images - balanced 3x2 grid
    if (total === 6) {
      if (index < 3) return "col-span-1 md:col-span-1 row-span-2";
      return "col-span-1 md:col-span-1 row-span-2";
    }
    
    // Seven images - organized with featured image
    if (total === 7) {
      if (index === 0) return "col-span-2 md:col-span-2 row-span-3";
      if (index <= 3) return "col-span-1 md:col-span-1 row-span-1";
      return "col-span-1 md:col-span-1 row-span-2";
    }
    
    // Eight images - balanced grid
    if (total === 8) {
      if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
      if (index <= 3) return "col-span-1 md:col-span-1 row-span-1";
      return "col-span-1 md:col-span-1 row-span-1";
    }
    
    // Nine images - perfect 3x3 grid
    if (total === 9) {
      return "col-span-1 md:col-span-1 row-span-1";
    }
    
    // Ten or more - repeating organized pattern
    if (total >= 10) {
      const patternIndex = index % 10;
      if (patternIndex === 0) return "col-span-2 md:col-span-2 row-span-2";
      if (patternIndex === 1 || patternIndex === 2) return "col-span-1 md:col-span-1 row-span-1";
      if (patternIndex === 3) return "col-span-2 md:col-span-2 row-span-1";
      if (patternIndex === 4 || patternIndex === 5) return "col-span-1 md:col-span-1 row-span-1";
      if (patternIndex === 6) return "col-span-2 md:col-span-2 row-span-2";
      if (patternIndex === 7 || patternIndex === 8) return "col-span-1 md:col-span-1 row-span-1";
      return "col-span-1 md:col-span-1 row-span-1";
    }
    
    // Default fallback
    return "col-span-1 md:col-span-1 row-span-1";
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-purple-400 to-violet-400 rounded-full"></span>
            Event Gallery
            <span className="text-lg text-white/50 font-normal ml-2">({resolvedImages.length})</span>
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>
        
        {/* Organized Masonry Grid with Spatial Awareness */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[180px]">
          {resolvedImages.map((image, index) => (
            <div
              key={index}
              className={`${getImageClass(index, resolvedImages.length)} group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:z-10`}
              style={{
                background: "linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(30, 27, 75, 0.4) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: `
                  0 4px 16px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
              }}
              onClick={() => openImage(image, index)}
            >
              <img
                src={withBasePath(image)}
                alt={`${eventTitle} - Image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => trySwapSrc(e.currentTarget)}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Hover Overlay with Icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                    <IconZoomIn size={28} className="text-white" />
                  </div>
                  <p className="text-white text-sm mt-3 text-center font-medium">Click to expand</p>
                </div>
              </div>

              {/* Image Number Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-white/80 font-medium">{index + 1}/{resolvedImages.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      {selectedImage && (
        <>
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 z-10 backdrop-blur-sm"
            >
              <IconX size={24} className="text-white" />
            </button>
            
            {/* Main Image Container */}
            <div className="relative max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={withBasePath(selectedImage)}
                  alt={`${eventTitle} - Full Size`}
                  className="w-full h-auto max-h-[85vh] object-contain"
                  onError={(e) => trySwapSrc(e.currentTarget)}
                />
                
                {/* Gradient Overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Navigation Buttons */}
              {resolvedImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 backdrop-blur-md group"
                  >
                    <IconChevronLeft size={24} className="text-white group-hover:translate-x-[-2px] transition-transform" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 backdrop-blur-md group"
                  >
                    <IconChevronRight size={24} className="text-white group-hover:translate-x-[2px] transition-transform" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {resolvedImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {resolvedImages.length}
                  </span>
                </div>
              )}
              
              {/* Thumbnail Strip */}
              {resolvedImages.length > 1 && resolvedImages.length <= 10 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  {resolvedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openImage(img, idx)}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentIndex === idx
                          ? "border-purple-400 scale-110 shadow-lg shadow-purple-500/50"
                          : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={withBasePath(img)}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => trySwapSrc(e.currentTarget)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </>
      )}
    </>
  );
}

