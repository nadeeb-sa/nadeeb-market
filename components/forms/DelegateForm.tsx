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
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DelegateForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("form");
  const te = useTranslations("error");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { languages: [] },
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

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 min-h-[52px] text-base text-gray-900 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors bg-gray-50/50";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

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
          <label className={labelClass}>{t("city")}</label>
          <select {...register("city")} className={inputClass}>
            <option value="">{t("required")}</option>
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.city && <p className={errorClass}>{t("required")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("experience")}</label>
          <select {...register("experience")} className={inputClass}>
            <option value="">{t("required")}</option>
            {expOptions.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
          {errors.experience && <p className={errorClass}>{t("required")}</p>}
        </div>
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
