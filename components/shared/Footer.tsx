"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <Link href={`/${locale}`}>
          <Image
            src="/logo.png"
            alt="نديب Nadeeb"
            width={96}
            height={32}
            className="h-8 w-auto opacity-60"
          />
        </Link>
        <p className="text-gray-400 text-sm">{t("copyright")}</p>
      </div>
    </footer>
  );
}
