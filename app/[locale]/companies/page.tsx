"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import CompanyForm from "@/components/forms/CompanyForm";
import {
  ArrowLeft, ArrowRight, CheckCircle2, FileText,
  Plane, MapPin, Ambulance,
  UserCheck, AlertCircle, HeartHandshake, Navigation
} from "lucide-react";

const SERVICE_ICONS = [Navigation, Plane, MapPin, MapPin, Ambulance, UserCheck, AlertCircle, HeartHandshake];

export default function CompaniesPage() {
  const t = useTranslations("companies");
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const [success, setSuccess] = useState(false);

  if (success) return <SuccessState />;

  const flow1Steps = t.raw("flow1Steps") as string[];
  const flow2Steps = t.raw("flow2Steps") as string[];
  const services = t.raw("services") as string[];
  const whyItems = [t("why1"), t("why2"), t("why3"), t("why4")];

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        badgeIcon="🏢"
        variant="companies"
      />

      {/* How it Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12"
          >
            {t("howTitle")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flow 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100"
            >
              <h3 className="font-bold text-[#156661] text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#156661] rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
                {t("flow1Title")}
              </h3>
              <div className="flex flex-col gap-3">
                {flow1Steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#156661] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Flow 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a2e] rounded-2xl p-6"
            >
              <h3 className="font-bold text-[#c0973b] text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#c0973b] rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                {t("flow2Title")}
              </h3>
              <div className="flex flex-col gap-3">
                {flow2Steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-300 text-sm flex-1">{step}</span>
                    {i < flow2Steps.length - 1 && (
                      <ArrowIcon className="w-4 h-4 text-[#c0973b]/50 flex-shrink-0" />
                    )}
                  </div>
                ))}
                <div className="mt-2 flex items-center gap-2 bg-[#c0973b]/10 rounded-lg p-2.5">
                  <FileText className="w-4 h-4 text-[#c0973b] flex-shrink-0" />
                  <span className="text-[#c0973b] text-xs font-medium">{flow2Steps[3]}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Field Services */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10"
          >
            {t("servicesTitle")}
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[i] || CheckCircle2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md hover:border-[#156661]/30 transition-all"
                >
                  <div className="w-10 h-10 bg-[#156661]/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#156661]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 leading-tight">{service}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Nadeeb */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10"
          >
            {t("whyTitle")}
          </motion.h2>
          <div className="flex flex-col gap-4">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9fa] border border-gray-100"
              >
                <span className="text-[#c0973b] text-xl font-bold flex-shrink-0 mt-0.5">⟡</span>
                <p className="text-gray-700 leading-relaxed font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-[640px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{t("formTitle")}</h2>
            <p className="text-gray-500 text-sm text-center mb-8">{t("formNote")}</p>
            <CompanyForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
