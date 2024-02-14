import Divider from "@/components/general/divider"
import ShowProducts from "@/components/general/show-products"
import { type SimilarProps } from "@/lib/types"

const Similar = ({ products, type, color, product, quantity }: SimilarProps) => {
  return (
    <>
      <Divider label={"Similar products"} />
      <section className="similar products cont">
        <ShowProducts
          products={products}
          quantity={quantity}
          type={type}
          color={color}
          product={product}
        />
      </section>
    </>
  )
}

export default Similar