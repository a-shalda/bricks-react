const calculatePrices = (product) => {

  if (product.priceType === 1) {

    const priceM = ((product.priceCentsM2 / 100).toFixed(2));
    const pricePc = (Math.ceil((product.priceCentsM2 / (Number(product.specs.piecesInSquareMeterCm / 100))).toFixed(4)) / 100).toFixed(2);
    return [priceM, pricePc]
  }
  else if (product.priceType === 2) {

    const priceM = (Math.ceil((product.priceCentsPc * (Number(product.specs.piecesInSquareMeterCm / 100))).toFixed(4)) / 100).toFixed(2);
    const pricePc = (product.priceCentsPc / 100).toFixed(2).toString();
    return [priceM, pricePc]
  }
  else if (product.priceType === 3) {

    const priceM = (Math.ceil((product.priceCentsPc * (Number(product.specs.piecesInLinearMeterCm / 100))).toFixed(4)) / 100).toFixed(2).toString();
    const pricePc = (product.priceCentsPc / 100).toFixed(2).toString();
    return [priceM, pricePc]
  }

  else if (product.priceType === 4) {

    const pricePc = (product.priceCentsPc / 100).toFixed(2).toString();
    return [pricePc]
  }
}

export default calculatePrices