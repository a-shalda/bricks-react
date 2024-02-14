import Saved from "@/components/saved/saved"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

export const metadata = {
  title: "Saved - Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};

const SavedPage = async () => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()
  
  return (
    <Saved products={fetchedProducts} />
  )
}

export default SavedPage