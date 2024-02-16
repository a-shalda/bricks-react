import { type ProductProps } from "@/lib/types"

const Additional = ({ product, dictionary }: { product: ProductProps, dictionary: any}) => {

  if (!product) return null
  if (!product.description) return null

  return (
    <section className="additional cont">
      <div className="additional__window">
        <div className="additional__window__head">
          <h2 className="additional__window__head__h2">{dictionary["Product_Card"]["about"]} {(product.id!).toUpperCase().replace(/-/g, " ")}</h2>
        </div>
        <div className="additional__window__body" itemProp="description">
          {product.description}
        </div>
      </div>
    </section>
  )
}

export default Additional