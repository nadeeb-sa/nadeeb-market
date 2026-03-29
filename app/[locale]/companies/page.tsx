"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import CompanyForm from "@/components/forms/CompanyForm";
import {
  CheckCircle2,
  Plane, MapPin, Ambulance,
  UserCheck, AlertCircle, HeartHandshake, Navigation
} from "lucide-react";

const SERVICE_ICONS = [Navigation, Plane, MapPin, MapPin, Ambulance, UserCheck, AlertCircle, HeartHandshake];

export default function CompaniesPage() {
  const t = useTranslations("companies");
  const [success, setSuccess] = useState(false);

  if (success) return <SuccessState />;

  const services = t.raw("services") as string[];

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaText={t("formTitle")}
        variant="companies"
      />

      {/* Field Services */}
      <section className="py-16 bg-primary/5">
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
                  className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-default"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 leading-tight">{service}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form-section" className="py-16 bg-white">
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
