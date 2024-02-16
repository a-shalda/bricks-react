import ProductComponent from "@/components/product_card/product-card"
import fetchAllProducts from "@/helpers/fetchAllProducts"
import selectOneProduct from "@/helpers/selectOneProduct"
import { type ProductsProps } from "@/lib/types"

const productId = "r669nf14"

export const metadata = {
  title: `${productId.toUpperCase()} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const Product = async ({ params: { lang } }: { params: { lang: Locale } }) => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts(lang)
  if (!fetchedProducts) return null

  const selectedProduct = selectOneProduct(fetchedProducts, productId)
  if (!selectedProduct) return null

  return (
    <ProductComponent product={selectedProduct} products={fetchedProducts} />
  )
}

export default Product