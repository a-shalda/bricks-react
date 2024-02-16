import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

const title = "Perel"

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

  const type = "Perel"
  const text = <></>

  return (
    <Shop
      title={dictionary["Categories"]["eight"]["title"]}
      products={fetchedProducts}
      type={type}
      text={text}
    />
  )
}

export default ShopPage