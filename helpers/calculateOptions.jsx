"use client"

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

    if (order === "first") return <option value="0">select quantity...</option>
    else if (order === "last") return <option value={totalPacks}>&gt;{totalVolume} m&sup2; specify in the cart</option>
    else return <option value={totalPacks}>{totalVolume} m&sup2;&nbsp; = &nbsp;€{priceModified} &nbsp;({totalPacksModified}, {piecesModified}, {totalWeight} kg, {totalPallets})</option>
  }

  if (product.priceType === 1) {

    const priceM2 = ((priceCentsM2 / 100).toFixed(2));
    priceForSnippet = priceM2
    const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);

    if ((piecesInPack % piecesInSquareMeter) === 0) { baseVolume = (piecesInPack / piecesInSquareMeter); }
    else { baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2)); }

    optionsHTML.push(
      <Option key={"first"} order={"first"} />
    )

    for (let i = 0; i < 90; i++) {

      if (totalVolume >= 90) { break; }
      totalVolume = totalVolume + baseVolume;

      if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) { totalVolume = Number(totalVolume.toFixed(2)); }

      pieces = pieces + basePieces;
      price = (totalVolume * priceM2).toFixed(2);

      if (price >= priceTotalLimit) { break; }

      totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2));
      if (totalPallets < 2) { totalPallets = totalPallets + ` pallet`; }
      else { totalPallets = totalPallets + ` pallets`; }

      totalPacks++;
      totalWeight = Number((totalWeight + weight).toFixed(2));

      let priceLength = String(price).length;
      let priceModified = String(price);
      if (priceLength > 6) { priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6)); }

      let piecesModified = '';
      if (pieces === 1) { piecesModified = pieces + ` pc`; }
      else { piecesModified = pieces + ` pcs`; }

      let totalPacksModified = '';
      if (totalPacks === 1) { totalPacksModified = totalPacks + ` pack` }
      else { totalPacksModified = totalPacks + ` packs` }

      optionsHTML.push(
        <Option key={totalPacks} totalPacks={totalPacks} totalVolume={totalVolume} priceModified={priceModified} totalPacksModified={totalPacksModified} piecesModified={piecesModified} totalWeight={totalWeight} totalPallets={totalPallets} />
      )
    }

    optionsHTML.push(
      <Option key={"last"} order={"last"} totalPacks={totalPacks} totalVolume={totalVolume} />
    )

    return optionsHTML
  }
  else if (product.priceType === 1) {

  }
  else if (product.priceType === 1) {

  }
  else if (product.priceType === 1) {

  }
}

export default calculateOptions