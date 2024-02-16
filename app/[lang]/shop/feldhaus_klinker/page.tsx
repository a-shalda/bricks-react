import Shop from "@/components/general/shop"
import { textFeldhaus, textFeldhaus_en } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

const title = "Klinker brick slips Feldhaus Klinker"

export const metadata = {
  title: `${title} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const ShopPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)

  const type = "Feldhaus Klinker"
  let text = textFeldhaus

  if (lang === "en") text = textFeldhaus_en

  return (
    <Shop
      title={dictionary["Categories"]["one"]["title"]}
      products={fetchedProducts}
      type={type}
      text={text}
    />
  )
}

export default ShopPage