import Categories from "@/components/main/categories";
import Divider from "@/components/general/divider";
import ShowProducts from "@/components/general/show-products";
import Slider from "@/components/main/slider";
import Text from "@/components/main/text";

import fetchAllProducts from "@/helpers/fetchAllProducts"
import { type ProductsProps } from "@/lib/types"


export default async function Home() {

  const fetchedProducts: ProductsProps | null | undefined = await fetchAllProducts()

  return (
    <>
      <Slider />
      <Divider label={"Categories"} />
      <Categories />
      <Divider label={"Products"} />

      <section className="products cont">
        <ShowProducts products={fetchedProducts} quantity={10} type={'Klinker brick slip'} />
      </section>

      <Divider label={"About"} />
      <Text />
    </>
  )
}