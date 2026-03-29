import { redirect } from "next/navigation";

// الصفحة الرئيسية تعيد التوجيه مباشرةً إلى صفحة المندوبين
export default function RootPage({
  params,
}: {
  params: { locale: string };
}) {
  redirect(`/${params.locale}/delegates`);
}
