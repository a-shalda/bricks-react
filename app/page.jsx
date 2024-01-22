import Categories from "@/components/main/categories";
import styles from "./page.module.css";
import Divider from "@/components/divider";
import ShowCategoryProducts from "@/components/show-products";

export default function Home() {
  return (
    <>
      <Categories />
      <Divider />
      <ShowCategoryProducts />
    </>
  )
}