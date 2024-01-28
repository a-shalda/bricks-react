import ShowProducts from "@/components/general/show-products"

const Shop = ({ title, products, type, text}) => {

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