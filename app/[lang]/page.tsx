import Categories from "@/components/main/categories";
import Divider from "@/components/general/divider";
import ShowProducts from "@/components/general/show-products";
import Slider from "@/components/main/slider";
import Text from "@/components/main/text";

import type { Metadata, ResolvingMetadata } from 'next'
import { type MetadataProductProps } from '@/lib/types'

export async function generateMetadata(
  { params }: MetadataProductProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const dictionary = await getDictionary(params.lang)

  const categoryTitle = dictionary["product_meta"]["pages"]["main"]
  const categoryDescription = dictionary["product_meta"]["pages"]["main"] + dictionary["product_meta"]["details-one"]

  return {
    title: categoryTitle,
    description: categoryDescription,
    alternates: {
      canonical: '/',
    },
  }
}

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {

  const dictionary = await getDictionary(lang);
  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)

  return (
    <>
      <Slider dictionary={dictionary} />
      <Divider label={dictionary["Main"]["first_divider"]} />
      <Categories dictionary={dictionary} />
      <Divider label={dictionary["Main"]["second_divider"]} />

      <section className="products cont">
        <ShowProducts
          products={fetchedProducts}
          quantity={10}
          type={'Klinker brick slip'}
          dictionary={dictionary}
        />
      </section>

      <Divider label={dictionary["Main"]["third_divider"]} />
      <Text lang={lang} />
    </>
  )
}