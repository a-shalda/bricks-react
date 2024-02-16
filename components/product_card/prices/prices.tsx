import calculatePrices from "@/helpers/calculatePrices"
import { type ProductProps, type PricesProps } from "@/lib/types"



const Prices = ({ product, cartType, dictionary }: PricesProps) => {

  const indexOfDot = (number: string) => number.indexOf('.')

  let priceM: string = ""
  let pricePc: string = "" 
  let priceMHtml: React.JSX.Element = <></>

  if (product.priceType !== 4) {

    const calculatedPrices = calculatePrices(product)

    if (calculatedPrices) {
      priceM = calculatedPrices[0]
      pricePc = calculatedPrices[1]
    }

    const contentProp = priceM.slice(0, indexOfDot(priceM)) + priceM.slice(indexOfDot(priceM))

    priceMHtml = (
      <>
        <sup itemProp="priceCurrency" content="EUR">{dictionary["Currency_symbol"]}</sup>
        {priceM.slice(0, indexOfDot(priceM))}
        <span className="price-small"
          itemProp="price" content={contentProp}>
          {priceM.slice(indexOfDot(priceM))}</span>
        <span className="price-desc">
          {(product.priceType !== 3) ?
            <>&nbsp;{dictionary["Product_Card"]["measures"]["m2"]}<sup>2</sup></> :
            <>&nbsp;{dictionary["Product_Card"]["measures"]["lin"]}</>
          }
        </span>
      </>
    )
  }
  else if (product.priceType === 4) {
    const calculatedPrices = calculatePrices(product)
    if (calculatedPrices) pricePc = calculatedPrices[0]
  } 

  let pricePcHtml = (
    <>
      <sup>{dictionary["Currency_symbol"]}</sup>
      {pricePc.slice(0, indexOfDot(pricePc))}
      <span className="price-small">
        {pricePc.slice(indexOfDot(pricePc))}
      </span>
      <span className="price-desc">
        &nbsp;{dictionary["Product_Card"]["measures"]["pc"]}
      </span>
    </>
  )

  let prices: React.JSX.Element

  if (!cartType) {
    prices = (
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
    return prices
  }
  else if (cartType === true) {
    prices = (
      <>
        <div className="cart__cont__product__price__left">
          <p className="cart__cont__product__price__left__box">
            {(product.priceType !== 4) ? priceMHtml : pricePcHtml}
          </p>
        </div>
        <div className="cart__cont__product__price__right">
          <p className="cart__cont__product__price__right__box">
            {(product.priceType !== 4) ? pricePcHtml : null}
          </p>
        </div>
      </>
    )
    return prices
  }
}

export default Prices