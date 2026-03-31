"use client";
import { useState } from "react";
import Image from "next/image";

export default function BrochurePage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");

      const img1 = await loadImage("/brochure/page-1.jpg");
      const img2 = await loadImage("/brochure/page-2.jpg");

      // A4 landscape for brochure look
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      // Page 1
      const p1 = fitImage(img1, 297, 210);
      pdf.addImage(img1.src, "JPEG", p1.x, p1.y, p1.w, p1.h);

      // Page 2
      pdf.addPage("a4", "landscape");
      const p2 = fitImage(img2, 297, 210);
      pdf.addImage(img2.src, "JPEG", p2.x, p2.y, p2.w, p2.h);

      pdf.save("نديب-بروشور.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1923] flex flex-col items-center py-10 px-4" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-bold">بروشور نديب</h1>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#c0973b] hover:bg-[#a8832f] disabled:opacity-60 disabled:cursor-wait
                     text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg"
        >
          {downloading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              جاري التحميل...
            </>
          ) : (
            <>
              <DownloadIcon />
              تحميل PDF
            </>
          )}
        </button>
      </div>

      {/* Pages */}
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {["/brochure/page-1.jpg", "/brochure/page-2.jpg"].map((src, i) => (
          <div
            key={i}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <Image
              src={src}
              alt={`صفحة ${i + 1}`}
              width={1200}
              height={849}
              className="w-full h-auto"
              priority={i === 0}
              quality={95}
            />
          </div>
        ))}
      </div>

      {/* Footer download */}
      <div className="mt-10">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#156661] hover:bg-[#0e4f4b] disabled:opacity-60
                     text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg"
        >
          {downloading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              جاري التحميل...
            </>
          ) : (
            <>
              <DownloadIcon />
              تحميل البروشور كـ PDF
            </>
          )}
        </button>
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function fitImage(img: HTMLImageElement, pageW: number, pageH: number) {
  const ratio = img.naturalWidth / img.naturalHeight;
  let w = pageW;
  let h = pageW / ratio;
  if (h > pageH) { h = pageH; w = pageH * ratio; }
  return { x: (pageW - w) / 2, y: (pageH - h) / 2, w, h };
}
