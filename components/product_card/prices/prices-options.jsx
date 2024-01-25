

const PricesOptions = () => {

  // if (typeof window !== "undefined") {
  //   if (window.innerWidth <= 906) { sliderHeight = 480; }
  //   else { sliderHeight = 640; }
  // }

  let rrr


  return (
    <div className="main__window__middle__top__stock__subtotal">
      <div className="main__window__middle__top__stock__subtotal__value">
        <label htmlFor="qty" className="main__window__middle__top__stock__subtotal__value--label">select
          quantity</label>
        <select name="Quantity" id="qty"
          className="main__window__middle__top__stock__subtotal__value__select">
          {rrr}
        </select>
      </div>
    </div>
  )
}

export default PricesOptions