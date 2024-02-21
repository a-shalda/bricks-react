import Login from "@/components/auth/login/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LoginPage({ params: { lang } }: { params: { lang: Locale } }) {

  const dictionary = await getDictionary(lang);

  const session = await getServerSession()
  if (session) {
    redirect("/" + dictionary["Language"] + "/")
  }

  return <Login dictionary={dictionary}/>
}