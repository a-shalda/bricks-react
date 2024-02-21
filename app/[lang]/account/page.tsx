import Account from "@/components/account/account";

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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

  const categoryTitle = dictionary["Account"]["title"]
  const categoryDescription = dictionary["Account"]["title"]

  return {
    title: categoryTitle,
    description: categoryDescription
  }
}

const AccountPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  // const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  const dictionary = await getDictionary(lang)

  const session = await getServerSession()
  if (!session) {
    redirect("/" + dictionary["Language"] + "/")
  }
  
  return (
    <Account dictionary={dictionary} />
  )
}

export default AccountPage