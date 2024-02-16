import "@/scss/styles.scss";
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import { ReactNode } from "react";
import { getDictionary } from "@/get-dictionary";


export const metadata = {
  title: "Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

import { i18n, type Locale } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: Locale } }) {
  
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className="body">
        <Header dictionary={dictionary} />
        {children}
        <Footer dictionary={dictionary} />
      </body>
    </html>
  );
}
