"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { submitInvestorLead } from "@/lib/api";

const schema = z.object({
  fullName: z.string().min(1),
  // TODO(human): This regex only accepts Saudi mobile (05xxxxxxxx).
  // Investors may be international — update this validation to handle
  // international phone numbers. Consider E.164 format, loose validation,
  // or conditional logic based on the country field.
  phone: z.string().regex(/^05\d{8}$/),
  email: z.string().email(),
  investorType: z.string().min(1),
  country: z.string().min(1),
  interestLevel: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function InvestorForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("form");
  const te = useTranslations("error");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await submitInvestorLead(data);
      onSuccess();
    } catch {
      setError(te("submitFailed"));
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 min-h-[52px] text-base text-gray-900 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors bg-gray-50/50";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

  const typeOptions = [
    { value: "individual", label: t("typeIndividual") },
    { value: "company", label: t("typeCompany") },
    { value: "fund", label: t("typeFund") },
  ];

  const interestOptions = [
    { value: "info", label: t("levelInfo") },
    { value: "interested", label: t("levelInterested") },
    { value: "ready", label: t("levelReady") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label className={labelClass}>{t("fullName")}</label>
        <input {...register("fullName")} className={inputClass} />
        {errors.fullName && <p className={errorClass}>{t("required")}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t("phone")}</label>
          <input {...register("phone")} className={inputClass} placeholder="05xxxxxxxx" dir="ltr" />
          {errors.phone && <p className={errorClass}>{t("invalidPhone")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("email")}</label>
          <input {...register("email")} type="email" className={inputClass} dir="ltr" />
          {errors.email && <p className={errorClass}>{t("invalidEmail")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t("investorType")}</label>
          <select {...register("investorType")} className={inputClass}>
            <option value="">{t("required")}</option>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.investorType && <p className={errorClass}>{t("required")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("country")}</label>
          <input {...register("country")} className={inputClass} />
          {errors.country && <p className={errorClass}>{t("required")}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("interestLevel")}</label>
        <select {...register("interestLevel")} className={inputClass}>
          <option value="">{t("required")}</option>
          {interestOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.interestLevel && <p className={errorClass}>{t("required")}</p>}
      </div>

      <div>
        <label className={labelClass}>{t("notes")}</label>
        <textarea {...register("notes")} className={inputClass} rows={3} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3.5 min-h-[52px] rounded-lg font-bold text-base hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
