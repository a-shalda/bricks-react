import calculatePrices from "@/helpers/calculatePrices"

const Prices = ({ product }) => {

  const indexOfDot = (number) => number.toString().indexOf('.')

  let priceM, pricePc, priceMHtml

  if (product.priceType !== 4) {
    priceM = calculatePrices(product)[0]
    pricePc = calculatePrices(product)[1]

    const contentProp = priceM.slice(0, indexOfDot(priceM)) + priceM.slice(indexOfDot(priceM))

    priceMHtml = (
      <>
        <sup itemProp="priceCurrency" content="EUR">€</sup>
        {priceM.slice(0, indexOfDot(priceM))}
        <span className="price-small"
          itemProp="price" content={contentProp}>
          {priceM.slice(indexOfDot(priceM))}</span>
        <span className="price-desc">
          {(product.priceType !== 3) ?
            <>&nbsp;m<sup>2</sup></> :
            <>&nbsp;lin.m</>
          }
        </span>
      </>
    )
  }
  else if (product.priceType === 4) pricePc = calculatePrices(product)[0]

  let pricePcHtml = (
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
          {(product.priceType !== 4) ? priceMHtml : pricePcHtml}
        </p>
      </div>
      <div className="main__window__middle__top__price__right">
        <p className="main__window__middle__top__price__right__box">
        {(product.priceType !== 4) ? pricePcHtml : null}
        </p>
      </div>
    </div>
  )
}

export default Prices