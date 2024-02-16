import { type ProductProps } from "@/lib/types"

const ProductCardTitle = ({ product, dictionary } : { product: ProductProps, dictionary: any}) => {
  
  let type = product.type_ru
  if (dictionary["Language"] === "en") type = product.type

  const productTitle = type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  return (
    <div className="main__cont">
    <h1 className="main__cont__title" itemProp="name">
      {productTitle}
    </h1>
  </div>
  )
}

export default ProductCardTitle