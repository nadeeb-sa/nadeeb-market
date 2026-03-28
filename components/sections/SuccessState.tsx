"use client";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessState() {
  const t = useTranslations("success");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {t("title")}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{t("subtitle")}</p>
      <Link
        href={`/${locale}`}
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        {t("backHome")}
      </Link>
    </motion.div>
  );
}
