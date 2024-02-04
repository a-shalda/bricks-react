import { type ProductProps } from "@/lib/types"

const Additional = ({ product }: { product: ProductProps}) => {

  if (!product.description) return null

  return (
    <section className="additional cont">
      <div className="additional__window">
        <div className="additional__window__head">
          <h2 className="additional__window__head__h2">About {(product.id).toUpperCase().replace(/-/g, " ")}</h2>
        </div>
        <div className="additional__window__body" itemProp="description">
          {product.description}
        </div>
      </div>
    </section>
  )
}

export default Additional