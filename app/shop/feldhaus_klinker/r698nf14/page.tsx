import ProductComponent from "@/components/product_card/product-card"
import fetchAllProducts from "@/helpers/fetchAllProducts"
import selectOneProduct from "@/helpers/selectOneProduct"
import { type ProductsProps } from "@/lib/types"

const productId = "r698nf14"

export const metadata = {
  title: `${productId.toUpperCase()} - Bricks eCommerce Shop`,
  description: "Bricks eCommerce Shop",
};

const Product = async () => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()
  if (!fetchedProducts) return null

  const selectedProduct = selectOneProduct(fetchedProducts, productId)
  if (!selectedProduct) return null

  return (
    <ProductComponent product={selectedProduct} products={fetchedProducts} />
  )
}

export default Product