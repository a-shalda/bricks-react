import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textRoben } from "@/data/texts"

const title = "Klinker brick slips Roben"
const type = "Roben"
const text = textRoben

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