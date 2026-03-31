import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "عن نديب",
  description: "منصة نديب للدعم الميداني في قطاع العمرة",
  robots: "noindex",
};

export default function BrochureLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
