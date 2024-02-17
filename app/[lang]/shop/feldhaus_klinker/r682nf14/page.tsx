import ProductComponent from "@/components/product_card/product-card"
import fetchAllProducts from "@/helpers/fetchAllProducts"
import selectOneProduct from "@/helpers/selectOneProduct"
import { type ProductsProps } from "@/lib/types"

const productId = "r682nf14"

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

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(params.lang)
  if (!fetchedProducts) return {
    title: productId,
  }
  const selectedProduct = selectOneProduct(fetchedProducts, productId)
  if (!selectedProduct) return {
    title: productId,
  }

  const dictionary = await getDictionary(params.lang)

  let type = selectedProduct.type_ru
  if (params.lang === "en") type = selectedProduct.type

  let productTitle = type + ' ' + selectedProduct.specs.manufacturer + ' ' + selectedProduct.name + ' ' + selectedProduct.specs.format + dictionary["product_meta"]["details-one"]
  let productDescription = type + ' ' + selectedProduct.specs.manufacturer + ' ' + selectedProduct.name + ' ' + selectedProduct.specs.format + dictionary["product_meta"]["details-two"]

  return {
    title: productTitle,
    description: productDescription
  }
}

const Product = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  if (!fetchedProducts) return null

  const selectedProduct = selectOneProduct(fetchedProducts, productId)
  if (!selectedProduct) return null

  const dictionary = await getDictionary(lang)

  return (
    <ProductComponent product={selectedProduct} products={fetchedProducts} dictionary={dictionary} />
  )
}

export default Product