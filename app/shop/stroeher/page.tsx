import Shop from "@/components/general/shop"
import { textStroeher } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

const title = "Stroeher"
const type = "Stroeher"
const text = textStroeher

export const metadata = {
  title: `${title} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

const ShopPage = async () => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()

  return (
    <Shop
      title={title}
      products={fetchedProducts}
      type={type}
      text={text}
    />
  )
}

export default ShopPage