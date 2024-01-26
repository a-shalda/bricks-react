import calculatePrices from "@/helpers/calculatePrices";

const calculateOptions = (product) => {

  const priceTotalLimit = 9000;
  const packsTotalLimit = 1000;

  const m2Limit = 1000;
  const pcLimit = 10000;
  const packLimit = 1000;

  let priceCentsM2 = product.priceCentsM2;
  let priceCentsPc = product.priceCentsPc;
  const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100);
  const piecesInPack = product.specs.piecesInPack;
  const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100);
  const isM2 = product.isM2;
  const isLinearMeter = product.isLinearMeter;
  let pricesHTML = '';

  let piecesModified
  let totalPacksModified = '';
  let priceForSnippet
  let optionsHTML = []
  let baseVolume;
  let totalVolume = 0;
  let price;
  let basePieces = piecesInPack;
  let pieces = 0;
  let totalPacks = 0;
  let weight = Number(product.specs.weightOf1PackGramm / 100);
  let weightOf1Piece = Number(product.specs.weightOf1PieceGramm / 100) //For bricks and mortars
  let totalWeight = 0;
  let piecesInPallet = product.specs.piecesInPallet;
  let squareMetersInPallet = product.specs.squareMetersInPallet;
  let totalPallets = 0;
  let productType = product.type;

  const Option = ({ order, totalPacks, totalVolume, priceModified, totalPacksModified, piecesModified, totalWeight, totalPallets }) => {


    if (product.priceType !== 3) {
      if (order === "first") return <option value="0">select quantity...</option>
      else if (order === "last") return <option value={totalPacks}>&gt;{totalVolume} m&sup2; specify in the cart</option>
    }
    else {
      if (order === "first") return <option value="0">select quantity...</option>
      else if (order === "last") return <option value={totalPacks}>&gt;{totalVolume} lin.m specify in the cart</option>
  
    }

    if (productType === 'Klinker brick' || productType === 'Klinker clay paver') {
      return <option value={totalPacks}>{totalVolume} m&sup2;&nbsp; = &nbsp;€{priceModified} &nbsp;({piecesModified}, {totalWeight} kg, {totalPallets})</option>
    }
    else if (product.priceType === 3) {
      return <option value={totalPacks}>{totalVolume} lin.m&nbsp;&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets})</option>
    }
    else {
      return <option value={totalPacks}>{totalVolume} m&sup2;&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets})</option>
    }
  }

  if (product.priceType === 1 || product.priceType === 2 || product.priceType === 3) {

    const priceM2 = calculatePrices(product)[0]
    const pricePc = calculatePrices(product)[1]

    priceForSnippet = priceM2

    if (product.priceType === 3) {
      if ((piecesInPack % piecesInLinearMeter) === 0) baseVolume = (piecesInPack / piecesInLinearMeter)
      else baseVolume = Number((piecesInPack / piecesInLinearMeter).toFixed(2))
    }
    else if (productType === 'Klinker brick' || productType === 'Klinker clay paver') {
      baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2))
      basePieces = piecesInPallet
    }
    else {
      if ((piecesInPack % piecesInSquareMeter) === 0) baseVolume = (piecesInPack / piecesInSquareMeter)
      else baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2))
    }

    optionsHTML.push(<Option key={"first"} order={"first"} />)

    for (let i = 0; i < 90; i++) {

      if (totalVolume > 90) break
      if (price >= priceTotalLimit) break

      pieces = pieces + basePieces

      if (productType === 'Klinker brick' || productType === 'Klinker clay paver') {
        if (i === 9) break
        if (price >= priceTotalLimit) break
        totalVolume = Number((totalVolume + baseVolume).toFixed(2))
        price = (pieces * pricePc).toFixed(2)
        totalPallets = Number((pieces / piecesInPallet).toFixed(2))
        totalPacks = totalPallets
        totalWeight = Number((totalWeight + (weightOf1Piece * piecesInPallet)).toFixed(2))
        piecesModified = pieces + ` pcs`
      }
      else {
        totalVolume = totalVolume + baseVolume

        if (product.priceType === 3) {
          if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) totalVolume = Number(totalVolume.toFixed(2))
        }
        else {
          if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) totalVolume = Number(totalVolume.toFixed(2))
        }

        totalPacks++
        totalWeight = Number((totalWeight + weight).toFixed(2))

        if (totalPacks === 1) { totalPacksModified = totalPacks + ` pack` }
        else { totalPacksModified = totalPacks + ` packs` }

        if (pieces === 1) { piecesModified = pieces + ` pc` }
        else { piecesModified = pieces + ` pcs` }

        if (product.priceType === 1) {
          price = (totalVolume * priceM2).toFixed(2);
          totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2))
        }
        else if (product.priceType === 2 || product.priceType === 3) {
          price = (pieces * pricePc).toFixed(2)
          totalPallets = Number((pieces / piecesInPallet).toFixed(2))
        }
      }

      if (totalPallets < 2) { totalPallets = totalPallets + ` pallet` }
      else { totalPallets = totalPallets + ` pallets` }

      let priceLength = String(price).length
      let priceModified = String(price)
      if (priceLength > 6) { priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6)) }

      optionsHTML.push(<Option key={totalPacks} totalPacks={totalPacks} totalVolume={totalVolume} priceModified={priceModified} totalPacksModified={totalPacksModified} piecesModified={piecesModified} totalWeight={totalWeight} totalPallets={totalPallets} />)
    }

    optionsHTML.push(<Option key={"last"} order={"last"} totalPacks={totalPacks} totalVolume={totalVolume} />)

    return optionsHTML
  }

  else if (product.priceType === 4) {

  }
}

export default calculateOptions