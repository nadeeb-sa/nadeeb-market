"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const MAPS_URL = "https://maps.google.com/?q=21.4348989,39.8584306";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 border-t-2 border-primary">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto w-full text-start">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="نديب Nadeeb"
                width={130}
                height={44}
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-primary font-semibold text-base">
              {t("tagline")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-bold text-base mb-5 border-b-2 border-primary pb-2 inline-block">
              {t("contact")}
            </h3>
            <ul className="flex flex-col gap-4">
              {/* Phone */}
              <li>
                <a
                  href="tel:+966556777063"
                  className="flex items-center gap-3 text-gray-900 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm font-medium" dir="ltr">
                    {t("phone")}
                  </span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@nadeeb.sa"
                  className="flex items-center gap-3 text-gray-900 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm font-medium" dir="ltr">
                    {t("email")}
                  </span>
                </a>
              </li>

              {/* Location */}
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-900 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm font-medium">
                    {t("location")}
                    <ExternalLink className="w-3 h-3 inline-block ms-1 opacity-50" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <p className="text-gray-400 text-xs">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
