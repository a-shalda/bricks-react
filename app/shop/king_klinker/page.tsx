import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "Klinker brick slips King Klinker"
const type = "King Klinker"
const text = textKingKlinker

const ShopPage = () => {

  return (
    <Shop
      title={title}
      products={products}
      type={type}
      text={text}
    />
  )
}

export default ShopPage