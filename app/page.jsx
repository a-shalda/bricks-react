import Categories from "@/components/main/categories";
import styles from "./page.module.css";
import Divider from "@/components/general/divider";
import ShowCategoryProducts from "@/components/general/show-products";
import Slider from "@/components/main/slider";
import Text from "@/components/main/text";
import products from "@/data/products"


export default function Home() {
  return (
    <>
      <Slider />
      <Divider label={"Categories"} />
      <Categories />
      <Divider label={"Products"} />

      <section className="products cont">
        <ShowCategoryProducts products={products} />
      </section>
      
      <Divider label={"About"} />
      <Text />
    </>
  )
}