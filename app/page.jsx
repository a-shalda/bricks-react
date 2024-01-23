import Categories from "@/components/main/categories";
import styles from "./page.module.css";
import Divider from "@/components/divider";
import ShowCategoryProducts from "@/components/show-products";
import Slider from "@/components/main/slider";
import Text from "@/components/main/text";

export default function Home() {
  return (
    <>
      <Slider />
      <Divider label={"Categories"} />
      <Categories />
      <Divider label={"Products"}/>
      <ShowCategoryProducts />
      <Divider label={"About"}/>
      <Text />
    </>
  )
}