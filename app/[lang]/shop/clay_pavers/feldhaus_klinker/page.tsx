import Shop from "@/components/general/shop"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import type { Metadata, ResolvingMetadata } from 'next'
import { type MetadataProductProps } from '@/lib/types'

export async function generateMetadata(
  { params }: MetadataProductProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const dictionary = await getDictionary(params.lang)

  const categoryTitle = dictionary["Categories"]["clay_pavers"]["title"] + " " + dictionary["Categories"]["one"]["title"]
  const categoryDescription = dictionary["Categories"]["clay_pavers"]["title"] + " " + dictionary["Categories"]["one"]["title"] + dictionary["product_meta"]["details-one"]

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

  const type = "Klinker clay paver"
  const text = <></>

  return (
    <Shop
      title={dictionary["Categories"]["clay_pavers"]["title"] + " " + dictionary["Categories"]["one"]["title"]}
      products={fetchedProducts}
      type={type}
      text={text}
      dictionary={dictionary}
    />
  )
}

export default ShopPage