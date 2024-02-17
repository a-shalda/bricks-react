import Search from "@/components/search/search"

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

  const categoryTitle = dictionary["product_meta"]["pages"]["search"]
  const categoryDescription = dictionary["product_meta"]["pages"]["search"] + dictionary["product_meta"]["details-one"]

  return {
    title: categoryTitle,
    description: categoryDescription
  }
}


const SearchPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)

  return (
    <Search products={fetchedProducts} dictionary={dictionary} />
  )
}

export default SearchPage