const ProductCardTitle = ({ product }) => {
  
  const productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  return (
    <div className="main__cont">
    <h1 className="main__cont__title" itemProp="name">
      {productTitle}
    </h1>
  </div>
  )
}

export default ProductCardTitle