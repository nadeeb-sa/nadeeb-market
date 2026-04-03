"use client";
import { useState, useRef, useEffect } from "react";
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
  nationalityOther: z.string().optional(),
  notes: z.string().optional(),
}).refine(
  (d) => d.nationality !== "OT" || (!!d.nationalityOther && d.nationalityOther.trim().length > 0),
  { message: "required", path: ["nationalityOther"] }
);

type FormData = {
  fullName: string; phone: string; email: string; city: string;
  experience: string; languages: string[]; nationality: string;
  nationalityOther?: string; notes?: string;
};

const NATIONALITIES = [
  "SA","AE","KW","QA","BH","OM",
  "EG","JO","SY","LB","IQ","PS","YE","SD","LY","TN","DZ","MA","MR","SO",
  "PK","IN","BD","NP","LK",
  "ID","MY","PH",
  "NG","ET","KE","TZ","SN","ML",
  "GB","US","FR","TR","IR","AF",
  "OT",
];

// Nationality Picker with search
function NationalityPicker({
  value,
  onChange,
  error,
  t,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = NATIONALITIES.filter((code) =>
    t(`nationality${code}`).toLowerCase().includes(search.toLowerCase()) ||
    code.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = value ? t(`nationality${value}`) : "";

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full border rounded-lg px-4 py-3 min-h-[52px] text-base text-right flex items-center justify-between gap-2 outline-none transition-colors bg-gray-50/50
          ${error ? "border-red-400 focus:ring-red-300" : "border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"}
          ${!value ? "text-gray-400" : "text-gray-900"}
        `}
      >
        <span className="truncate">{selectedLabel || t("nationality")}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                autoFocus
                placeholder={t("nationalitySearch")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-400 text-sm">لا توجد نتائج</div>
            ) : (
              filtered.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => { onChange(code); setOpen(false); setSearch(""); }}
                  className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors
                    ${value === code ? "bg-primary/5 text-primary font-semibold" : "text-gray-800"}
                  `}
                >
                  <span className="flex-1">{t(`nationality${code}`)}</span>
                  {value === code && <span className="text-primary text-xs">✓</span>}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DelegateForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("form");
  const te = useTranslations("error");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { languages: [], nationality: "" },
  });

  const languages = watch("languages");
  const nationality = watch("nationality");

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
      // If "other" selected, send the typed value as nationality
      const payload = {
        ...data,
        nationality: data.nationality === "OT" && data.nationalityOther
          ? data.nationalityOther.trim()
          : data.nationality,
      };
      await submitDelegateLead(payload);
      onSuccess();
    } catch {
      setError(te("submitFailed"));
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 min-h-[52px] text-base text-gray-900 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors bg-gray-50/50 hover:border-gray-300";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClass = "text-red-500 text-xs mt-1.5 flex items-center gap-1";

  const cities = [
    { value: "makkah",  label: t("cityMakkah") },
    { value: "madinah", label: t("cityMadinah") },
    { value: "jeddah",  label: t("cityJeddah") },
    { value: "other",   label: t("cityOther") },
  ];

  const expOptions = [
    { value: "0-1", label: t("exp1") },
    { value: "1-3", label: t("exp2") },
    { value: "3-5", label: t("exp3") },
    { value: "5+",  label: t("exp4") },
  ];

  const langOptions = [
    { value: "arabic",  label: t("langAr") },
    { value: "english", label: t("langEn") },
    { value: "urdu",    label: t("langUr") },
    { value: "malay",   label: t("langMs") },
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

      {/* Nationality — searchable picker */}
      <div>
        <label className={labelClass}>{t("nationality")}</label>
        <NationalityPicker
          value={nationality}
          onChange={(v) => setValue("nationality", v, { shouldValidate: true })}
          error={!!errors.nationality}
          t={t}
        />
        {errors.nationality && <p className={errorClass}>{t("required")}</p>}
      </div>

      {nationality === "OT" && (
        <div>
          <label htmlFor="d-natOther" className={labelClass}>
            {t("nationalityOtherLabel")}
            <span className="text-red-500 mr-1">*</span>
          </label>
          <input
            id="d-natOther"
            {...register("nationalityOther")}
            placeholder={t("nationalityOtherPlaceholder")}
            className={`${inputClass} ${errors.nationalityOther ? "border-red-400 focus:ring-red-300" : ""}`}
            autoFocus
          />
          {errors.nationalityOther && <p className={errorClass}>{t("required")}</p>}
        </div>
      )}

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
