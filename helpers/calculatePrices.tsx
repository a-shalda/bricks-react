import { type ProductProps } from "@/lib/types"

const calculatePrices = (product: ProductProps) => {

  if (product.priceType === 1 && product.priceCentsM2 && product.specs.piecesInSquareMeterCm) {

    const priceM = (product.priceCentsM2 / 100).toFixed(2)
    const pricePc = (Math.ceil(Number((product.priceCentsM2 / (product.specs.piecesInSquareMeterCm / 100)).toFixed(4))) / 100).toFixed(2)
    return [priceM, pricePc]
  }
  else if (product.priceType === 2 && product.priceCentsPc && product.specs.piecesInSquareMeterCm) {

    const priceM = ((Math.ceil(Number((product.priceCentsPc * (product.specs.piecesInSquareMeterCm / 100)).toFixed(4))))/100).toString()
    const pricePc = (product.priceCentsPc / 100).toFixed(2)
    return [priceM, pricePc]
  }
  else if (product.priceType === 3 && product.priceCentsPc && product.specs.piecesInLinearMeterCm) {

    const priceM = (Math.ceil(Number((product.priceCentsPc * (product.specs.piecesInLinearMeterCm / 100)).toFixed(4))) / 100).toFixed(2)
    const pricePc = (product.priceCentsPc / 100).toFixed(2)
    return [priceM, pricePc]
  }

  else if (product.priceType === 4 && product.priceCentsPc) {

    const pricePc = (product.priceCentsPc / 100).toFixed(2)
    return [pricePc]
  }
}

export default calculatePrices