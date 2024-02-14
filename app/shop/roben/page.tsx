import Shop from "@/components/general/shop"
import { textRoben } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

const title = "Klinker brick slips Roben"
const type = "Roben"
const text = textRoben

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