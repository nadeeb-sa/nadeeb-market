"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { submitCompanyLead } from "@/lib/api";

const schema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  phone: z.string().regex(/^05\d{8}$/),
  email: z.string().email(),
  licenseNo: z.string().optional(),
  city: z.string().min(1),
  companySize: z.string().min(1),
  website: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CompanyForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("form");
  const te = useTranslations("error");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await submitCompanyLead(data);
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

  const sizeOptions = [
    { value: "small", label: t("sizeSmall") },
    { value: "medium", label: t("sizeMedium") },
    { value: "large", label: t("sizeLarge") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t("companyName")}</label>
          <input {...register("companyName")} className={inputClass} />
          {errors.companyName && <p className={errorClass}>{t("required")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("contactName")}</label>
          <input {...register("contactName")} className={inputClass} />
          {errors.contactName && <p className={errorClass}>{t("required")}</p>}
        </div>
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
          <label className={labelClass}>{t("companySize")}</label>
          <select {...register("companySize")} className={inputClass}>
            <option value="">{t("required")}</option>
            {sizeOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.companySize && <p className={errorClass}>{t("required")}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("licenseNo")}</label>
        <input {...register("licenseNo")} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{t("website")}</label>
        <input {...register("website")} className={inputClass} dir="ltr" />
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
