"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import SuccessState from "@/components/sections/SuccessState";
import DelegateForm from "@/components/forms/DelegateForm";
import { Network, Zap, Wallet, Shield } from "lucide-react";

export default function DelegatesPage() {
  const t = useTranslations("delegates");
  const [success, setSuccess] = useState(false);

  if (success) {
    return <SuccessState />;
  }

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        badgeIcon="🕋"
        variant="delegates"
      />

      {/* Benefits — Asymmetric 2-column layout */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Card 1 — Large (60%) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-s-4 border-s-[#156661] border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#156661]/10 rounded-xl flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-[#156661]" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("benefit1Title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("benefit1Desc")}</p>
            </motion.div>

            {/* Card 2 — Medium (40%) */}
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
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("benefit2Title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("benefit2Desc")}</p>
            </motion.div>

            {/* Card 3 — Medium (40%) */}
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
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("benefit3Title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("benefit3Desc")}</p>
            </motion.div>

            {/* Card 4 — Large (60%) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 bg-white rounded-xl p-7 shadow-sm border-b-[3px] border-b-[#c0973b] border border-gray-100"
            >
              <div className="w-12 h-12 bg-[#c0973b]/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#c0973b]" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t("benefit4Title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("benefit4Desc")}</p>
            </motion.div>
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
            <DelegateForm onSuccess={() => setSuccess(true)} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
