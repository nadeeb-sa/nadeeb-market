"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("pilgrims"), label: t("pilgrimsLabel") },
    { value: t("companies"), label: t("companiesLabel") },
    { value: t("delegatesCount"), label: t("delegatesLabel") },
    { value: t("commission"), label: t("commissionLabel") },
  ];

  return (
    <section className="bg-primary py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-3xl md:text-4xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
