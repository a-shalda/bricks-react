import { NewVerificationForm } from "@/components/auth/new-verification-form/new-verification-form"

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const NewVerificationPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const dictionary = await getDictionary(lang);

  return <NewVerificationForm dictionary={dictionary} />
}

export default NewVerificationPage