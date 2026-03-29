import { Metadata } from "next";

export const metadata: Metadata = {
  title: "نديب | Nadeeb",
  description: "حلول مبتكرة لرفع كفاءة التشغيل الميداني لشركات العمرة وتقليل التكاليف التشغيلية",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "نديب | Nadeeb",
    description: "حلول مبتكرة لرفع كفاءة التشغيل الميداني لشركات العمرة وتقليل التكاليف التشغيلية",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نديب | Nadeeb",
    description: "حلول مبتكرة لرفع كفاءة التشغيل الميداني لشركات العمرة وتقليل التكاليف التشغيلية",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
