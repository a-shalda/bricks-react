import calculatePrices from "@/helpers/calculatePrices"
import Image from "next/image"
import Link from "next/link"
import Prices from "@/components/product_card/prices/prices"

const Option = ({ order, product, totalPacks, totalVolume, priceModified, totalPacksModified, piecesModified, totalWeight, totalPallets }) => {

  let spec
  const p = product.priceType;

  (p === 1 || p === 2) ? spec = <>m&sup2;</> :
    (p === 3) ? spec = <>lin.m</> :
      (p === 3) ? spec = <>pcs</> : null

  if (order === "first") return <option value="0">select quantity...</option>
  else if (order === "last") return <option value={totalPacks}>&gt;{totalVolume} {spec} specify in the cart</option>

  if (p === 1 || p === 2) {
    if (product.type === 'Klinker brick' || product.type === 'Klinker clay paver') return <option value={totalPacks}>{totalVolume} {spec}&nbsp; = &nbsp;€{priceModified} &nbsp;({piecesModified}, {totalWeight} kg, {totalPallets})</option>
    else return <option value={totalPacks}>{totalVolume} {spec}&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets})</option>
  }
  else if (p === 3) return <option value={totalPacks}>{totalVolume} {spec}&nbsp;&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets})</option>
  else if (p === 4) return <option value={totalPacks}>{piecesModified}&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {totalWeight} kg, {totalPallets})</option>
}

const calculateOptions = (product, cartPacks) => {

  const priceTotalLimit = 9000
  const packsTotalLimit = 1000

  const m2Limit = 1000
  const pcLimit = 10000
  const packLimit = 1000

  let priceCentsM2 = product.priceCentsM2
  let priceCentsPc = product.priceCentsPc
  const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100)
  const piecesInPack = product.specs.piecesInPack
  const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100)
  const isM2 = product.isM2
  const isLinearMeter = product.isLinearMeter
  let pricesHTML


  let supplierPriceType = ''
  let quantityPacks = cartPacks
  let productTitle = ''
  let productHTML = ''

  let totalCostCart = 0
  let totalCostCartLimit = 100000 //Used to set a ceiling on the order total
  let totalSquareMetersCart = 0
  let totalLinearMetersCart = 0
  let totalPacksCart = 0
  let totalPiecesCart = 0
  let totalWeightCart = 0
  let totalPalletsCart = 0

  let totalPiecesCartMofified = ''
  let totalPacksCartMofified = ''


  let piecesModified
  let totalPacksModified = ''
  let priceForSnippet
  let optionsHTML = []
  let optionsCart = []
  let baseVolume
  let totalVolume = 0
  let price
  let basePieces = piecesInPack
  let pieces = 0
  let totalPacks = 0
  let weight = Number(product.specs.weightOf1PackGramm / 100)
  let weightOf1Piece = Number(product.specs.weightOf1PieceGramm / 100) //For bricks and mortars
  let totalWeight = 0
  let piecesInPallet = product.specs.piecesInPallet
  let squareMetersInPallet = product.specs.squareMetersInPallet
  let totalPallets = 0
  let productType = product.type

  let priceM2, pricePc

  if (product.priceType !== 4) {
    priceM2 = calculatePrices(product)[0]
    pricePc = calculatePrices(product)[1]
  }
  else if (product.priceType === 4) pricePc = calculatePrices(product)[0]

  priceForSnippet = priceM2

  if (product.priceType === 4) {
    baseVolume = 1
    basePieces = 1
  }
  else if (product.priceType === 3) {
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

  if (!cartPacks) optionsHTML.push(<Option key={"first"} order={"first"} product={product} />)

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
      else if (product.priceType === 2 || product.priceType === 3 || product.priceType === 4) {
        price = (pieces * pricePc).toFixed(2)
        totalPallets = Number((pieces / piecesInPallet).toFixed(2))
      }
    }

    if (totalPallets < 2) { totalPallets = totalPallets + ` pallet` }
    else { totalPallets = totalPallets + ` pallets` }

    let priceLength = String(price).length
    let priceModified = String(price)
    if (priceLength > 6) { priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6)) }

    if (!cartPacks) optionsHTML.push(<Option key={totalPacks} product={product} totalPacks={totalPacks} totalVolume={totalVolume} priceModified={priceModified} totalPacksModified={totalPacksModified} piecesModified={piecesModified} totalWeight={totalWeight} totalPallets={totalPallets} />)
    else {


      if (totalPacks === quantityPacks) {

        totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2)
        totalSquareMetersCart = (Number(totalSquareMetersCart) + Number(totalVolume)).toFixed(2)
        totalPacksCart = (Number(totalPacksCart) + Number(totalPacks))
        totalPiecesCart = (Number(totalPiecesCart) + Number(pieces))
        totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2)
        totalPalletsCart = (Number(totalPalletsCart) + Number(totalPallets)).toFixed(2)

        productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;

        let NotBrickOrPaver
        if (product.type !== 'Klinker brick' && product.type !== 'Klinker clay paver') {
          NotBrickOrPaver = <p className="cart__cont__product__quantity__packs">Packs: {totalPacks}</p>
        }


        // updateTotal()

        productHTML = (
          <div className="cart__cont__product">
            <div className="cart__cont__product__image">
              <a href={product.filepath}>
                <Image width="350" height="229" className="cart__cont__product__image__img" src={product.image_thumbnail[0]} alt={product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format} loading="lazy" />
              </a>
            </div>
            <div className="cart__cont__product__price">
              <Prices
                product={product}
                cartType={true}
              />
            </div>
            <div className="cart__cont__product__vendor">
              <p className="cart__cont__product__vendor__code">Code:&nbsp;</p>
              <p className="cart__cont__product__vendor__id">{product.id}</p>
            </div>
            <div className="cart__cont__product__title">
              <Link href={product.filepath}>
                <p className="cart__cont__product__title__name">{productTitle}</p>
              </Link>
            </div>
            <div className="cart__cont__product__quantity">
              <div className="cart__cont__product__quantity__modify">
                <p className="cart__cont__product__quantity__qty">Quantity: {totalVolume} m&sup2;</p>

                <div className="cart__cont__product__quantity__buttons">
                  <a className="cart__cont__product__quantity__buttons__minus">-</a>
                  <a className="cart__cont__product__quantity__buttons__plus">+</a>
                </div>
              </div>

              {NotBrickOrPaver}
              <p className="cart__cont__product__quantity__pieces">Pieces: {pieces}</p>
              <p className="cart__cont__product__quantity__weight">Weight (kg): {totalWeight}</p>
              <p className="cart__cont__product__quantity__pallets">Pallets: {totalPallets}</p>

              <div className="cart__cont__product__quantity__sub-del">
                <p className="cart__cont__product__quantity__subtotal">Subtotal: €{priceModified}</p>
                <a className="cart__cont__product__quantity__delete">Delete</a>
              </div>

            </div>
            <div className="cart__cont__product__save"></div>
            <div className="cart__cont__product__remove"></div>
          </div>
        )

        return productHTML
      }
    }
  }

  if (!cartPacks) optionsHTML.push(<Option key={"last"} order={"last"} product={product} totalPacks={totalPacks} totalVolume={totalVolume} />)

  return optionsHTML
}

export default calculateOptions