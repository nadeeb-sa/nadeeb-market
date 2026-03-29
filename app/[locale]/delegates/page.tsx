"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import DelegateForm from "@/components/forms/DelegateForm";
import {
  CheckCircle2, Users, Plane, MapPin,
  Ambulance, UserCheck, AlertCircle, HeartHandshake,
  Navigation, Wallet, Star, Zap
} from "lucide-react";

const SERVICE_ICONS = [Navigation, Plane, MapPin, MapPin, Ambulance, UserCheck, AlertCircle, HeartHandshake];

export default function DelegatesPage() {
  const t = useTranslations("delegates");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [success, setSuccess] = useState(false);

  if (success) return <SuccessState />;

  const services = t.raw("services") as string[];
  const howSteps = [t("howStep1"), t("howStep2"), t("howStep3"), t("howStep4")];

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        badgeIcon="🕋"
        variant="delegates"
      />

      {/* Why Join */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12"
          >
            {t("whyTitle")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Card 1 — Large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-s-4 border-s-[#156661] border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#156661]/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#156661]" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-base">{t("why1")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-[#f0f9f8] rounded-xl p-7"
            >
              <div className="w-12 h-12 bg-[#156661]/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#156661]" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why2")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 bg-[#fdf6ec] rounded-xl p-7"
            >
              <div className="w-12 h-12 bg-[#c0973b]/10 rounded-xl flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-[#c0973b]" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why3")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-b-[3px] border-b-[#c0973b] border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#c0973b]/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-[#c0973b]" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why4")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10"
          >
            {t("howTitle")}
          </motion.h2>
          <div className="flex flex-col gap-0">
            {howSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 relative"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 bg-[#156661] rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {i + 1}
                  </div>
                  {i < howSteps.length - 1 && (
                    <div className="w-px h-12 bg-[#156661]/20" />
                  )}
                </div>
                <div className={`pb-8 ${i < howSteps.length - 1 ? "" : ""}`}>
                  <p className="text-gray-800 font-semibold pt-2.5">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
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
                  className="bg-[#f8f9fa] rounded-xl p-4 border border-gray-100 flex flex-col items-center text-center gap-2 hover:border-[#156661]/30 hover:shadow-sm transition-all"
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
            <DelegateForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
