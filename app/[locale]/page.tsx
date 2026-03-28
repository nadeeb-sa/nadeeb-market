"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Building2, TrendingUp } from "lucide-react";

export default function HubPage() {
  const t = useTranslations();
  const locale = useLocale();

  const cards = [
    {
      key: "delegates",
      href: `/${locale}/delegates`,
      icon: Users,
      title: t("hub.delegatesTitle"),
      desc: t("hub.delegatesDesc"),
      cta: t("hub.delegatesCta"),
      iconBg: "bg-[#156661]",
    },
    {
      key: "companies",
      href: `/${locale}/companies`,
      icon: Building2,
      title: t("hub.companiesTitle"),
      desc: t("hub.companiesDesc"),
      cta: t("hub.companiesCta"),
      iconBg: "bg-[#1a1a2e]",
    },
    {
      key: "investors",
      href: `/${locale}/investors`,
      icon: TrendingUp,
      title: t("hub.investorsTitle"),
      desc: t("hub.investorsDesc"),
      cta: t("hub.investorsCta"),
      iconBg: "bg-[#c0973b]",
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Image
          src="/logo.png"
          alt="نديب Nadeeb"
          width={160}
          height={53}
          className="h-14 md:h-16 w-auto mx-auto mb-6"
          priority
        />
        <p className="text-lg text-gray-500">
          {t("hub.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Link href={card.href} className="block group h-full">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:-translate-y-2 h-full flex flex-col">
                <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-gray-500 mb-6 flex-1 leading-relaxed">{card.desc}</p>
                <span className="text-primary font-semibold text-sm group-hover:underline">
                  {card.cta}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
