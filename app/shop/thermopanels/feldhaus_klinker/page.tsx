import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "Thermopanels"
const type = "Thermopanel"
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