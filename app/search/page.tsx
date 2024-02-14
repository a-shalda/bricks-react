import Search from "@/components/search/search"

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"

export const metadata = {
  title: "Search - Bricks eCommerce Shop",
  description: "Bricks eCommerce Shop",
};


const SearchPage = async () => {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()

  return (
    <Search products={fetchedProducts} />
  )
}

export default SearchPage