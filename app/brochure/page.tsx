"use client";
import { useState } from "react";
import Image from "next/image";

export default function BrochurePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const pages = [
    { src: "/brochure/page-1.png", alt: "البروشور - الصفحة الأولى", w: 1654, h: 2339 },
    { src: "/brochure/page-2.png", alt: "البروشور - الصفحة الثانية", w: 1654, h: 2339 },
  ];

  return (
    <div className="min-h-screen bg-[#0f1923] flex flex-col items-center py-10 px-4" dir="rtl">

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all"
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="عرض كامل"
            className="max-w-full max-h-[95vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-bold">بروشور نديب</h1>
        <a
          href="/brochure/nadeeb-brochure.pdf"
          download="نديب-بروشور.pdf"
          className="flex items-center gap-2 bg-[#c0973b] hover:bg-[#a8832f]
                     text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg"
        >
          <DownloadIcon />
          تحميل PDF
        </a>
      </div>

      {/* Pages */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {pages.map((p, i) => (
          <div
            key={i}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10
                       cursor-zoom-in group"
            onClick={() => setLightbox(p.src)}
            title="اضغط لعرض بالحجم الكامل"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]"
              priority={i === 0}
              quality={95}
            />
            {/* Zoom hint */}
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg
                            opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
              <ZoomIcon />
              اضغط للتكبير
            </div>
          </div>
        ))}
      </div>

      {/* Footer download */}
      <div className="mt-10">
        <a
          href="/brochure/nadeeb-brochure.pdf"
          download="نديب-بروشور.pdf"
          className="flex items-center gap-2 bg-[#156661] hover:bg-[#0e4f4b]
                     text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg"
        >
          <DownloadIcon />
          تحميل البروشور كـ PDF
        </a>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
