import calculatePrices from "@/helpers/calculatePrices"
import { type ProductProps } from "@/lib/types"

type PricesProps = {
  product: ProductProps,
  cartType?: boolean
}

const Prices = ({ product, cartType }: PricesProps) => {

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
  else if (product.priceType === 4) {
    const calculatedPrices = calculatePrices(product)
    if (calculatedPrices) pricePc = calculatedPrices[0]
  } 

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