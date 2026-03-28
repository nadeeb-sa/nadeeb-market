"use client";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeIcon?: string;
  variant?: "delegates" | "companies" | "investors";
}

export default function Hero({ title, subtitle, badge, badgeIcon, variant = "delegates" }: HeroProps) {
  const variantStyles = {
    delegates: "bg-gradient-to-br from-[#0d4441] via-[#156661] to-[#1f8a84]",
    companies: "bg-[#1a1a2e]",
    investors: "bg-[#1a1610]",
  };

  return (
    <section className={`relative ${variantStyles[variant]} text-white py-20 md:py-28 min-h-[60vh] flex items-center overflow-hidden`}>
      {/* Pattern overlays */}
      {variant === "delegates" && (
        <div className="absolute inset-0 geometric-pattern text-white/[0.04]" />
      )}
      {variant === "companies" && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c0973b]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c0973b]/40 to-transparent" />
          <div className="absolute top-8 left-8 w-32 h-32 border border-[#c0973b]/10 rotate-45" />
          <div className="absolute bottom-8 right-8 w-24 h-24 border border-[#c0973b]/10 rotate-12" />
        </>
      )}
      {variant === "investors" && (
        <div className="absolute inset-0 gold-dots-pattern text-[#c0973b]/[0.08]" />
      )}

      <div className="relative max-w-4xl mx-auto px-4 text-center w-full">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 text-sm font-medium"
          >
            {badgeIcon && <span>{badgeIcon}</span>}
            <span>{badge}</span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-5xl font-bold leading-tight mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
