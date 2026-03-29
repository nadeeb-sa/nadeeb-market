"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import InvestorForm from "@/components/forms/InvestorForm";
import { CheckCircle } from "lucide-react";

export default function InvestorsPage() {
  const t = useTranslations("investors");
  const [success, setSuccess] = useState(false);

  if (success) {
    return <SuccessState />;
  }

  const metrics = [
    {
      value: t("metric1Value"),
      label: t("metric1Label"),
      sub: t("metric1Sub"),
      accent: "border-s-[#c0973b]",
    },
    {
      value: t("metric2Value"),
      label: t("metric2Label"),
      sub: t("metric2Sub"),
      accent: "border-s-[#156661]",
    },
    {
      value: t("metric3Value"),
      label: t("metric3Label"),
      sub: t("metric3Sub"),
      accent: "border-s-[#0d4441]",
    },
  ];

  const whyItems = [
    t("why1"), t("why2"), t("why3"),
    t("why4"), t("why5"), t("why6"),
  ];

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        badgeIcon="chart"
        ctaText={t("formTitle")}
        variant="investors"
      />

      {/* Opportunity — Metric cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`bg-white rounded-xl p-7 border border-gray-100 shadow-sm border-s-4 ${metric.accent}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <p className="text-gray-700 font-medium mb-1">{metric.label}</p>
                <p className="text-gray-400 text-sm">{metric.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Nadeeb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t("whyNadeebTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl mx-auto">
              {whyItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#156661] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 bg-[#fdf6ec]">
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
            <InvestorForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
