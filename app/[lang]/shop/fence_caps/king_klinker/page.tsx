import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import type { Metadata, ResolvingMetadata } from 'next'
import { type MetadataProductProps } from '@/lib/types'

export async function generateMetadata(
  { params }: MetadataProductProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const dictionary = await getDictionary(params.lang)

  const categoryTitle = dictionary["Categories"]["fence_caps"]["title"] + " " + dictionary["Categories"]["five"]["title"]
  const categoryDescription = dictionary["Categories"]["fence_caps"]["title"] + " " + dictionary["Categories"]["five"]["title"] + dictionary["product_meta"]["details-one"]

  return {
    title: categoryTitle,
    description: categoryDescription
  }
}

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const ShopPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)

  const type = "Ceramic fence cap"
  const text = <></>

  return (
    <Shop
      title={dictionary["Categories"]["fence_caps"]["title"] + " " + dictionary["Categories"]["five"]["title"]}
      products={fetchedProducts}
      type={type}
      text={text}
      dictionary={dictionary}
    />
  )
}

export default ShopPage