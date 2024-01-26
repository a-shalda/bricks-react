"use client"

import calculateOptions from "@/helpers/calculateOptions"


const PricesOptions = ({ product }) => {

  // if (typeof window !== "undefined") {
  //   if (window.innerWidth <= 906) { sliderHeight = 480; }
  //   else { sliderHeight = 640; }
  // }

  const options = calculateOptions(product)

  console.log(options && options.map(option => option))


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