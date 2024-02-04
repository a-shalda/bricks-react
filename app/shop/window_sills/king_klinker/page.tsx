import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textKingKlinker } from "@/data/texts"

const title = "Window sills"
const type = "Ceramic window sill"
const text = <></>

export const metadata = {
  title: `${title} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

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