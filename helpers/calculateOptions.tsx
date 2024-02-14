import calculatePrices from "@/helpers/calculatePrices"
import { type ProductProps, OptionProps } from "@/lib/types"


const Option = ({ order, product, totalPacks, totalVolume, priceModified, totalPacksModified, piecesModified, totalWeight, totalPallets }: OptionProps) => {

  let spec: React.JSX.Element = <></>
  const p = product.priceType;

  (p === 1 || p === 2) ? spec = <>m&sup2;</> :
    (p === 3) ? spec = <>lin.m</> :
      (p === 3) ? spec = <>pcs</> : null

  if (order === "first") return <option value="0">select quantity...</option>
  else if (order === "last") return <option value={totalPacks}>&gt;{totalVolume} {spec} specify in the cart</option>

  if (p === 1 || p === 2) {
    if (product.type === 'Klinker brick' || product.type === 'Klinker clay paver') return <option value={totalPacks}>{totalVolume} {spec}&nbsp; = &nbsp;€{priceModified} &nbsp;({piecesModified}, {totalWeight} kg, {totalPallets} pal)</option>
    else return <option value={totalPacks}>{totalVolume} {spec}&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets} pal)</option>
  }
  else if (p === 3) return <option value={totalPacks}>{totalVolume} {spec}&nbsp;&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets} pal)</option>
  else if (p === 4) return <option value={totalPacks}>{piecesModified}&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {totalWeight} kg, {totalPallets} pal)</option>
}

const calculateOptions = (product: ProductProps, cartPacks?: number) => {

  let priceTotalLimit = 9000
  let piecesInSquareMeter
  if (product.specs.piecesInSquareMeterCm) piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100)
  let piecesInLinearMeter
  const piecesInPack: number | undefined = product.specs.piecesInPack
  if (product.specs.piecesInLinearMeterCm) piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100)
  let quantityPacks: number | undefined = cartPacks
  let piecesModified: string
  let totalPacksModified: string = ""
  let optionsHTML: React.JSX.Element[] = []
  let baseVolume: number = 0
  let totalVolume = 0
  let price: string = ""
  let basePieces = piecesInPack
  let pieces = 0
  let totalPacks = 0
  let weight
  if (product.specs.weightOf1PackGramm) weight = product.specs.weightOf1PackGramm / 100
  let weightOf1Piece: number = 0
  product.specs.weightOf1PieceGramm && product.specs.weightOf1PieceGramm / 100 //For bricks and mortar
  let totalWeight = 0
  let piecesInPallet = product.specs.piecesInPallet
  let squareMetersInPallet = product.specs.squareMetersInPallet
  let totalPallets = 0
  let productType = product.type

  let priceM2: string = ""
  let pricePc: string = ""
  const calculatedProducts = calculatePrices(product)

  if (product.priceType !== 4) {
    if (calculatedProducts) {
      priceM2 = calculatedProducts[0]
      pricePc = calculatedProducts[1]
    }
  }
  else if (product.priceType === 4) {
    if (calculatedProducts) {
      pricePc = calculatedProducts[0]
    }
  }

  if (product.priceType === 4) {
    baseVolume = 1
    basePieces = 1
  }
  else if (product.priceType === 3) {
    if (piecesInPack && piecesInLinearMeter) {
      if ((piecesInPack % piecesInLinearMeter) === 0) baseVolume = (piecesInPack / piecesInLinearMeter)
      else baseVolume = Number((piecesInPack / piecesInLinearMeter).toFixed(2))
    }
  }
  else if (productType === 'Klinker brick' || productType === 'Klinker clay paver') {
    if (piecesInPallet && piecesInSquareMeter) {
      baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2))
      basePieces = piecesInPallet
    }
  }
  else {
    if (piecesInPack && piecesInSquareMeter) {
      if ((piecesInPack % piecesInSquareMeter) === 0) baseVolume = (piecesInPack / piecesInSquareMeter)
      else baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2))
    }
  }

  if (!cartPacks) optionsHTML.push(<Option key={"first"} order={"first"} product={product} />)

  let generalLimit = 0
  let brickLimit = 0

  if (cartPacks) {
    generalLimit = 5000
    brickLimit = 5000
    priceTotalLimit = 100000
  } else {
    generalLimit = 90
    brickLimit = 9
    priceTotalLimit = 9000
  }

  for (let i = 0; i < generalLimit; i++) {

    if (totalVolume > generalLimit) break
    if (Number(price) >= priceTotalLimit) break

    if (basePieces) pieces = pieces + basePieces
    let totalPalletsNumber: number = 0

    if (productType === 'Klinker brick' || productType === 'Klinker clay paver') {
      if (i === brickLimit) break
      totalVolume = Number((totalVolume + baseVolume).toFixed(2))
      price = (pieces * Number(pricePc)).toFixed(2)
      if (piecesInPallet) totalPallets = Number((pieces / piecesInPallet).toFixed(2))
      totalPacks = totalPallets
      if (piecesInPallet) totalWeight = Number((totalWeight + (weightOf1Piece * piecesInPallet)).toFixed(2))
      piecesModified = pieces + ` pcs`
      totalPalletsNumber = totalPallets
    }
    else {
      totalVolume = totalVolume + baseVolume

      if (product.priceType === 3) {
        if (piecesInPack && piecesInLinearMeter) {
          if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) totalVolume = Number(totalVolume.toFixed(2))
        }
      }
      else {
        if (piecesInPack && piecesInSquareMeter) {
          if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) totalVolume = Number(totalVolume.toFixed(2))
        }
      }

      totalPacks++
      if (weight) totalWeight = Number((totalWeight + weight).toFixed(2))

      if (totalPacks === 1) { totalPacksModified = totalPacks + ` pack` }
      else { totalPacksModified = totalPacks + ` packs` }

      if (pieces === 1) { piecesModified = pieces + ` pc` }
      else { piecesModified = pieces + ` pcs` }

      if (product.priceType === 1) {
        price = (totalVolume * Number(priceM2)).toFixed(2)
        if (squareMetersInPallet) totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2))
      }
      else if (product.priceType === 2 || product.priceType === 3 || product.priceType === 4) {
        price = (pieces * Number(pricePc)).toFixed(2)
        if (piecesInPallet) totalPallets = Number((pieces / piecesInPallet).toFixed(2))
      }
    }

    let priceLength = String(price).length
    let priceModified = String(price)
    if (priceLength > 6) { priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6)) }

    if (!cartPacks) optionsHTML.push(<Option key={totalPacks} product={product} totalPacks={totalPacks} totalVolume={totalVolume} priceModified={priceModified} totalPacksModified={totalPacksModified} piecesModified={piecesModified} totalWeight={totalWeight} totalPallets={totalPallets} />)
    else {

      if (totalPacks === quantityPacks) {
        return [price, totalVolume, totalPacks, pieces, totalWeight, totalPallets, priceModified, totalPalletsNumber, piecesModified]
      }
    }
  }

  if (!cartPacks) {
    optionsHTML.push(<Option key={"last"} order={"last"} product={product} totalPacks={totalPacks} totalVolume={totalVolume} />)
    return optionsHTML
  }
}

export default calculateOptions