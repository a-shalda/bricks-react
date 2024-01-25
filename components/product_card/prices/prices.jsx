import calculatePrices from "@/helpers/calculatePrices"

const Prices = ({ product }) => {

  const indexOfDot = (number) => number.toString().indexOf('.')

  if (product.priceType === 1) {

    const priceM2 = calculatePrices(product)[0]
    const pricePc = calculatePrices(product)[1]

    const contentProp = priceM2.slice(0, indexOfDot(priceM2)) + priceM2.slice(indexOfDot(priceM2))

    let priceM2HTML = (
      <>
        <sup itemProp="priceCurrency" content="EUR">€</sup>
        {priceM2.slice(0, indexOfDot(priceM2))}
        <span className="price-small"
          itemProp="price" content={contentProp}>
          {priceM2.slice(indexOfDot(priceM2))}</span>
        <span className="price-desc">
          &nbsp;m<sup>2</sup></span>
      </>
    )

    let pricePcHTML = (
      <>
        <sup>€</sup>
        {pricePc.slice(0, indexOfDot(pricePc))}
        <span className="price-small">
          {pricePc.slice(indexOfDot(pricePc))}
        </span>
        <span className="price-desc">
          &nbsp;pc
        </span>
      </>
    )

    return (
      <div className="main__window__middle__top__price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <div className="main__window__middle__top__price__left">
          <p className="main__window__middle__top__price__left__box">
            {priceM2HTML}
          </p>
        </div>
        <div className="main__window__middle__top__price__right">
          <p className="main__window__middle__top__price__right__box">
            {pricePcHTML}
          </p>
        </div>
      </div>
    )
  }
  else if (product.priceType === 2) {


  }
  else if (product.priceType === 3) {


  }

  else if (product.priceType === 4) {


  }
}

export default Prices