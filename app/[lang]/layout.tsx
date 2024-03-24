import "@/scss/styles.scss";
import Header from "@/components/general/header/header";
import Footer from "@/components/general/footer";
import { getDictionary } from "@/get-dictionary";
import { getServerSession } from "next-auth";
import { Providers } from "@/app/GlobalRedux/provider";



export const metadata = {
  metadataBase: new URL('https://www.klinkernaya-plitka.ru'),
  title: "Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

import { i18n, type Locale } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: Locale } }) {

  const dictionary = await getDictionary(params.lang);
  const session = await getServerSession()

  const isLoggedIn = !!session

  return (
    <html lang={params.lang}>
      <body className="body">
        <Providers>
          <Header dictionary={dictionary} isLoggedIn={isLoggedIn} />
          {children}
          <Footer dictionary={dictionary} />
        </Providers>
      </body>
    </html>
  );
}
