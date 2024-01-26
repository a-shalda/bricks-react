import calculateOptions from "@/helpers/calculateOptions"


const PricesOptions = ({ product }) => {

  const options = calculateOptions(product)

  return (
    <div className="main__window__middle__top__stock__subtotal">
      <div className="main__window__middle__top__stock__subtotal__value">
        <label htmlFor="qty" className="main__window__middle__top__stock__subtotal__value--label">select
          quantity</label>
        <select name="Quantity" id="qty"
          className="main__window__middle__top__stock__subtotal__value__select">
          {options && options.map(option => option)}
        </select>
      </div>
    </div>
  )
}

export default PricesOptions