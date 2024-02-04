import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textStroeher } from "@/data/texts"

const title = "Stroeher"
const type = "Stroeher"
const text = textStroeher

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