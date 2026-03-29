"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import DelegateForm from "@/components/forms/DelegateForm";
import { Users, Wallet, Star, Zap } from "lucide-react";

export default function DelegatesPage() {
  const t = useTranslations("delegates");
  const [success, setSuccess] = useState(false);

  if (success) return <SuccessState />;


  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaText={t("formTitle")}
        variant="delegates"
      />

      {/* Why Nadeeb */}
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
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-s-4 border-s-primary border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-base">{t("why1")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-primary/5 rounded-xl p-7"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why2")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 bg-secondary/5 rounded-xl p-7"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why3")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-b-[3px] border-b-secondary border border-gray-100"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-gray-700 leading-relaxed font-medium">{t("why4")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form-section" className="py-16 bg-gray-50">
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
