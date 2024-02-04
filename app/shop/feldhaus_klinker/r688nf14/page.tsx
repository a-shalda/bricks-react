import ProductComponent from "@/components/product_card/product-card"

const productId = "r688nf14"

export const metadata = {
  title: `${productId.toUpperCase()} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

const Product = () => {
  return (
    <ProductComponent productId={productId} />
  )
}

export default Product