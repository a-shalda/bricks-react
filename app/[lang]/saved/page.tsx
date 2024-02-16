import Saved from "@/components/saved/saved"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: "Saved - Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

const SavedPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)
  
  return (
    <Saved products={fetchedProducts} dictionary={dictionary} />
  )
}

export default SavedPage