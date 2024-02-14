import Cart from "@/components/cart/cart"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

export const metadata = {
  title: "Cart - Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

const CartPage = async () => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()

  return (
    <Cart products={fetchedProducts} />
  )
}

export default CartPage