import Divider from "@/components/general/divider"
import ShowProducts from "@/components/general/show-products"


const Similar = ({ products, type, color, product }) => {

  return (
    <>
      <Divider label={"Similar products"} />
      <section className="similar products cont">
        <ShowProducts
          products={products}
          quantity={5}
          type={type}
          color={color}
          product={product}
        />
      </section>
    </>
  )
}

export default Similar