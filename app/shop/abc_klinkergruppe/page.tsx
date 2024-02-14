import Shop from "@/components/general/shop"
import { textAbc } from "@/data/texts"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

const title = "Klinker brick slips ABC-Klinkergruppe"
const type = "ABC-Klinkergruppe"
const text = textAbc

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