import Shop from "@/components/general/shop"
import { textAbc, textAbc_en } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

import type { Metadata, ResolvingMetadata } from 'next'
import { type MetadataProductProps } from '@/lib/types'

export async function generateMetadata(
  { params }: MetadataProductProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const dictionary = await getDictionary(params.lang)

  const categoryTitle = dictionary["Categories"]["brick_slips"]["title"] + " " + dictionary["Categories"]["four"]["title"]
  const categoryDescription = dictionary["Categories"]["brick_slips"]["title"] + " " + dictionary["Categories"]["four"]["title"] + dictionary["product_meta"]["details-one"]

  return {
    title: categoryTitle,
    description: categoryDescription
  }
}


const ShopPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)

  const type = "ABC-Klinkergruppe"
  let text = textAbc

  if (lang === "en") text = textAbc_en

  return (
    <Shop
      title={dictionary["Categories"]["brick_slips"]["title"] + " " + dictionary["Categories"]["four"]["title"]}
      products={fetchedProducts}
      type={type}
      text={text}
      dictionary={dictionary}
    />
  )
}

export default ShopPage