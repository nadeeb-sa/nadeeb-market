import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const resolved = (await requestLocale) || locale || "ar";

  return {
    locale: resolved,
    messages: (await import(`./messages/${resolved}.json`)).default,
  };
});
