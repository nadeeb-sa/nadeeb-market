"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const MAPS_URL =
  "https://maps.google.com/?q=21.4348989,39.8584306";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <footer className="bg-[#0f1923] text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 ${isAr ? "text-right" : "text-left"}`}>

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href={`/${locale}/delegates`}>
              <Image
                src="/logo.png"
                alt="نديب Nadeeb"
                width={130}
                height={44}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isAr
                ? "منصة نديب لإدارة خدمات العمرة والحج — تربط الشركات بالمناديب المحترفين."
                : "Nadeeb platform for Umrah & Hajj services management — connecting companies with professional delegates."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 border-b border-[#156661] pb-2 inline-block">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                {
                  label: isAr ? "للمناديب" : "For Delegates",
                  href: `/${locale}/delegates`,
                },
                {
                  label: isAr ? "للشركات" : "For Companies",
                  href: `/${locale}/companies`,
                },
                {
                  label: isAr ? "للمستثمرين" : "For Investors",
                  href: `/${locale}/investors`,
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#c0973b] transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#156661] inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 border-b border-[#156661] pb-2 inline-block">
              {isAr ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="flex flex-col gap-4">
              {/* Phone */}
              <li>
                <a
                  href="tel:+966556777063"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#c0973b] transition-colors group"
                  dir="ltr"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#156661]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#156661]/40 transition-colors">
                    <Phone className="w-4 h-4 text-[#156661]" />
                  </span>
                  <span className="text-sm" dir="ltr">055 677 7063</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@nadeeb.sa"
                  className="flex items-center gap-3 text-gray-400 hover:text-[#c0973b] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#156661]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#156661]/40 transition-colors">
                    <Mail className="w-4 h-4 text-[#156661]" />
                  </span>
                  <span className="text-sm" dir="ltr">info@nadeeb.sa</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-[#c0973b] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#156661]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#156661]/40 transition-colors">
                    <MapPin className="w-4 h-4 text-[#156661]" />
                  </span>
                  <span className="text-sm leading-relaxed">
                    {isAr
                      ? "مكة المكرمة — شارع الحج"
                      : "Makkah Al-Mukarramah — Al-Hajj Street"}
                    <ExternalLink className="w-3 h-3 inline-block mr-1 opacity-50" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            {t("copyright")}
          </p>
          <p className="text-gray-600 text-xs">
            {isAr ? "مكة المكرمة، المملكة العربية السعودية 🇸🇦" : "Makkah, Saudi Arabia 🇸🇦"}
          </p>
        </div>
      </div>
    </footer>
  );
}
