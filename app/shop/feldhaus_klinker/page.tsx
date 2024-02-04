import products from "@/data/products"
import Shop from "@/components/general/shop"
import { textFeldhaus } from "@/data/texts"

const title = "Klinker brick slips Feldhaus Klinker"
const type = "Feldhaus Klinker"
const text = textFeldhaus

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