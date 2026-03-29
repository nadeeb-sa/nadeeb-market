"use client";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="نديب Nadeeb"
            width={120}
            height={40}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </div>

        <button
          onClick={switchLocale}
          className="flex items-center text-sm font-semibold text-gray-600 hover:text-primary bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 transition-colors"
        >
          {t("language")}
        </button>
      </div>
    </nav>
  );
}
