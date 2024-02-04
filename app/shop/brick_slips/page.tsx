import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "Klinker brick slips"
const type = "Klinker brick slip"
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