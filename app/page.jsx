import Categories from "@/components/main/categories";
import styles from "./page.module.css";
import Divider from "@/components/divider";
import ShowCategoryProducts from "@/components/show-products";
import Slider from "@/components/main/slider";

export default function Home() {
  return (
    <>
      <Slider />
      <Divider />
      <Categories />
      <Divider />
      <ShowCategoryProducts />
    </>
  )
}