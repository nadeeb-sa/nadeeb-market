"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import CompanyForm from "@/components/forms/CompanyForm";
import { LayoutDashboard, MapPin, ClipboardList, BarChart3 } from "lucide-react";

export default function CompaniesPage() {
  const t = useTranslations("companies");
  const [success, setSuccess] = useState(false);

  if (success) {
    return <SuccessState />;
  }

  const features = [
    { icon: LayoutDashboard, title: t("benefit1Title"), desc: t("benefit1Desc") },
    { icon: MapPin, title: t("benefit2Title"), desc: t("benefit2Desc") },
    { icon: ClipboardList, title: t("benefit3Title"), desc: t("benefit3Desc") },
    { icon: BarChart3, title: t("benefit4Title"), desc: t("benefit4Desc") },
  ];

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        badgeIcon="🏢"
        variant="companies"
      />

      {/* Benefits — Vertical feature list with alternating layout */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-0">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-5 py-8 ${i < features.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="w-14 h-14 bg-[#156661] rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1.5">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-[640px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              {t("formTitle")}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              {t("formNote")}
            </p>
            <CompanyForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
