import Divider from "@/components/general/divider"
import ShowProducts from "@/components/general/show-products"
import { type SimilarProps } from "@/lib/types"

const Similar = ({ products, type, color, product, quantity, dictionary }: SimilarProps) => {
  return (
    <>
      <Divider label={dictionary["Product_Card"]["first_divider"]} />
      <section className="similar products cont">
        <ShowProducts
          products={products}
          quantity={quantity}
          type={type}
          color={color}
          product={product}
          dictionary={dictionary}
        />
      </section>
    </>
  )
}

export default Similar