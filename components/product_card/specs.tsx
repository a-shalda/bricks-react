import { v4 as uuidv4 } from 'uuid'
import { type ProductPropsAll, SpecProps, specsObjProps } from "@/lib/types"


const Spec = ({ leftProp, rightProp }: SpecProps) => {

  let span = <span className="main__window__middle__bottom__left_right">{rightProp}</span>
  if (leftProp === "Country of origin") span = <span className="main__window__middle__bottom__left_right" itemProp="countryOfOrigin">{rightProp}</span>

  return (
    <p className="main__window__middle__bottom__left">
      <span className="main__window__middle__bottom__left_left">
        {leftProp}
      </span>
      <span className="main__window__middle__bottom__left_middle"></span>
      {span}
    </p>
  )
}

const Specs = ({ product, dictionary }: { product: ProductPropsAll, dictionary: any }) => {

  let specs = product.specs
  let specsHTML = []
  const p = product.priceType

  let piecesInSquareMeter
  let piecesInLinearMeter: number = 0
  let weight
  let weightOf1Piece: number = 0

  if (product.specs.piecesInSquareMeterCm) piecesInSquareMeter = product.specs.piecesInSquareMeterCm / 100
  if (product.specs.piecesInLinearMeterCm) piecesInLinearMeter = product.specs.piecesInLinearMeterCm / 100
  if (product.specs.weightOf1PackGramm) weight = product.specs.weightOf1PackGramm / 100
  if (product.specs.weightOf1PieceGramm) weightOf1Piece = product.specs.weightOf1PieceGramm / 100 //For bricks and mortars

  let specsObj: specsObjProps = {
    0: ["Шт в упаковке", specs.piecesInPack],
    1: ["Шт в погонном метре", piecesInLinearMeter],
    2: ["Шт в кв.м.", piecesInSquareMeter],
    3: ["Кв.м. в палете", specs.squareMetersInPallet],
    4: ["Шт в палете", specs.piecesInPallet],
    5: ["Рекомендуемая толщина шва (мм)", specs.recommendedJointSpacing],
    6: ["Толщина (мм)", specs.thickness],
    7: ["Размер (мм)", specs.format],
    8: ["Рекомендуемый объем сухой смеси (кг)", specs.recommendedDryMortarVolume],
    9: ["Вес 1 шт (кг)", weightOf1Piece],
    10: ["Вес 1 кв.м. (кг)", specs.weightOf1SquareMeter],
    11: ["Вес 1 погонного метра (кг)", Number(Number(weightOf1Piece * piecesInLinearMeter).toFixed(2))],
    12: ["Вес 1 упаковки (кг)", weight],
    13: ["Производитель", specs.manufacturer],
    14: ["Страна производства", specs.countryOfOrigin]
  }

  if (dictionary["Language"] === "en") {
    specsObj = {
      0: ["Pieces in a pack", specs.piecesInPack],
      1: ["Pieces in a linear meter", piecesInLinearMeter],
      2: ["Pieces in a square meter", piecesInSquareMeter],
      3: ["Square meters in a pallet", specs.squareMetersInPallet],
      4: ["Pieces in a pallet", specs.piecesInPallet],
      5: ["Recommended joint spacing (mm)", specs.recommendedJointSpacing],
      6: ["Thickness (mm)", specs.thickness],
      7: ["Format (mm)", specs.format],
      8: ["Recommended dry mortar volume (kg)", specs.recommendedDryMortarVolume],
      9: ["Weight of 1 piece (kg)", weightOf1Piece],
      10: ["Weight of 1 square meter (kg)", specs.weightOf1SquareMeter],
      11: ["Weight of 1 linear meter (kg)", Number(Number(weightOf1Piece * piecesInLinearMeter).toFixed(2))],
      12: ["Weight of 1 pack (kg)", weight],
      13: ["Manufacturer", specs.manufacturer],
      14: ["Country of origin", specs.countryOfOrigin]
    }
  }

  for (let spec in specsObj) {

    if (p === 1) {
      if (spec === "1" || spec === "4" || spec === "11") continue
    }
    else if (p === 2) {
      if (product.type === 'Klinker brick' || product.type === 'Klinker clay paver') {
        if (spec === "0" || spec === "10" || spec === "12") continue
      }
      if (spec === "1" || spec === "3" || spec === "11") continue
    }
    else if (p === 3) {
      if (spec === "2" || spec === "3" || spec === "10") continue
    }
    else if (p === 4) {
      if (spec === "0" || spec === "1" || spec === "2" || spec === "3" || spec === "5" || spec === "6" || spec === "8" || spec === "10" || spec === "11") continue
    }

    specsHTML.push(<Spec key={uuidv4()} leftProp={specsObj[spec][0]} rightProp={specsObj[spec][1]} />)
  }


  return (
    <div className="main__window__middle__bottom">
      {specsHTML.map(spec => spec)}
    </div>
  )
}

export default Specs