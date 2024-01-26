import calculateOptions from "@/helpers/calculateOptions"


const PricesOptions = ({ product, setQuantity, quantity, errorAdding, setToCartMessage }) => {

  const options = calculateOptions(product)

  const handleSelect = (e) => {
    setQuantity(Number(e.target.value))
    setToCartMessage(e.target[e.target.value].text)
  }

  return (

    <div className="main__window__middle__top__stock">
      <div className="main__window__middle__top__stock__info"></div>
      <div className="main__window__middle__top__stock__subtotal">
        <div className="main__window__middle__top__stock__subtotal__value">
          <label htmlFor="qty" className="main__window__middle__top__stock__subtotal__value--label">select
            quantity</label>
          <select
            onChange={handleSelect}
            value={quantity}
            name="Quantity" id="qty"
            className={`main__window__middle__top__stock__subtotal__value__select ${errorAdding}`}>
            {options && options.map(option => option)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PricesOptions