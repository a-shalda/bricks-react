import calculateOptions from "@/helpers/calculateOptions"

const CartProduct = ({ product, cartQuantity}) => {
  return calculateOptions(product, cartQuantity)
}

export default CartProduct