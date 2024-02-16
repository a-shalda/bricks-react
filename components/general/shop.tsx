import ShowProducts from "@/components/general/show-products"
import { type ProductsProps, type ShopProps } from "@/lib/types"


const Shop = ({ title, products, type, text, dictionary }: ShopProps) => {

  return (
    <main>
      <section className="cont">
        <h1 className="section__title">
          {title}
        </h1>
        <div className="products">
          <ShowProducts
            products={products}
            type={type}
            dictionary={dictionary}
          />
        </div>
      </section>
      <section className="text cont">
        {text}
      </section>
    </main>
  )
}

export default Shop