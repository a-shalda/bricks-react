import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "All products"
const type = ""
const text = <></>

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