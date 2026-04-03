"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { submitDelegateLead } from "@/lib/api";

const schema = z.object({
  fullName: z.string().min(1),
  phone: z.string().regex(/^05\d{8}$/),
  email: z.string().email(),
  city: z.string().min(1),
  experience: z.string().min(1),
  languages: z.array(z.string()).default([]),
  nationality: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DelegateForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("form");
  const te = useTranslations("error");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { languages: [], nationality: "" },
  });

  const languages = watch("languages");

  const toggleLang = (lang: string) => {
    const current = languages || [];
    setValue(
      "languages",
      current.includes(lang) ? current.filter((l) => l !== lang) : [...current, lang],
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await submitDelegateLead(data);
      onSuccess();
    } catch {
      setError(te("submitFailed"));
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 min-h-[52px] text-base text-gray-900 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors bg-gray-50/50 hover:border-gray-300";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClass = "text-red-500 text-xs mt-1.5 flex items-center gap-1";

  const cities = [
    { value: "makkah", label: t("cityMakkah") },
    { value: "madinah", label: t("cityMadinah") },
    { value: "jeddah", label: t("cityJeddah") },
    { value: "other", label: t("cityOther") },
  ];

  const expOptions = [
    { value: "0-1", label: t("exp1") },
    { value: "1-3", label: t("exp2") },
    { value: "3-5", label: t("exp3") },
    { value: "5+", label: t("exp4") },
  ];

  const langOptions = [
    { value: "arabic", label: t("langAr") },
    { value: "english", label: t("langEn") },
    { value: "urdu", label: t("langUr") },
    { value: "malay", label: t("langMs") },
  ];

  const nationalityOptions = [
    { value: "SA", label: t("nationalitySA") },
    { value: "EG", label: t("nationalityEG") },
    { value: "PK", label: t("nationalityPK") },
    { value: "IN", label: t("nationalityIN") },
    { value: "BD", label: t("nationalityBD") },
    { value: "ID", label: t("nationalityID") },
    { value: "MY", label: t("nationalityMY") },
    { value: "YE", label: t("nationalityYE") },
    { value: "SY", label: t("nationalitySY") },
    { value: "OT", label: t("nationalityOT") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="d-fullName" className={labelClass}>{t("fullName")}</label>
        <input id="d-fullName" {...register("fullName")} className={inputClass} />
        {errors.fullName && <p className={errorClass}>{t("required")}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="d-phone" className={labelClass}>{t("phone")}</label>
          <input id="d-phone" {...register("phone")} className={inputClass} placeholder="05xxxxxxxx" dir="ltr" />
          {errors.phone && <p className={errorClass}>{t("invalidPhone")}</p>}
        </div>
        <div>
          <label htmlFor="d-email" className={labelClass}>{t("email")}</label>
          <input id="d-email" {...register("email")} type="email" className={inputClass} dir="ltr" />
          {errors.email && <p className={errorClass}>{t("invalidEmail")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="d-city" className={labelClass}>{t("city")}</label>
          <select id="d-city" {...register("city")} className={`${inputClass} cursor-pointer`}>
            <option value="">{t("required")}</option>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.city && <p className={errorClass}>{t("required")}</p>}
        </div>
        <div>
          <label htmlFor="d-experience" className={labelClass}>{t("experience")}</label>
          <select id="d-experience" {...register("experience")} className={`${inputClass} cursor-pointer`}>
            <option value="">{t("required")}</option>
            {expOptions.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
          {errors.experience && <p className={errorClass}>{t("required")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="d-nationality" className={labelClass}>{t("nationality")}</label>
        <select id="d-nationality" {...register("nationality")} className={`${inputClass} cursor-pointer`}>
          <option value="">{t("required")}</option>
          {nationalityOptions.map((n) => (
            <option key={n.value} value={n.value}>{n.label}</option>
          ))}
        </select>
        {errors.nationality && <p className={errorClass}>{t("required")}</p>}
      </div>

      <div>
        <label className={labelClass}>{t("languages")}</label>
        <div className="flex flex-wrap gap-3">
          {langOptions.map((l) => (
            <label key={l.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages?.includes(l.value) || false}
                onChange={() => toggleLang(l.value)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{l.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="d-notes" className={labelClass}>{t("notes")}</label>
        <textarea id="d-notes" {...register("notes")} className={inputClass} rows={3} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3.5 min-h-[52px] rounded-xl font-bold text-base hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isSubmitting && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
