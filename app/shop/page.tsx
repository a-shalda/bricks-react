import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "All products"

export const metadata = {
  title: `${title} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};


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