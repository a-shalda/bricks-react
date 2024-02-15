import { type ProductPropsAll } from "@/lib/types"

export const productIsValid = (fetchedProduct: ProductPropsAll) => {

  if (!fetchedProduct) return null
  else if (!fetchedProduct.id) return null
  else if (!fetchedProduct.productTypeNumber) return null
  else if (fetchedProduct.productTypeNumber) {
    if (fetchedProduct.productTypeNumber === 1) {

      if (!fetchedProduct.id) return null
      if (!fetchedProduct.type) return null
      if (!fetchedProduct.name) return null
      if (!fetchedProduct.availability) return null
      if (!fetchedProduct.filepath) return null
      if (!fetchedProduct.priceCentsM2) return null
      if (!fetchedProduct.supplierPriceType) return null
      if (!fetchedProduct.priceType) return null
      if (!(fetchedProduct.isM2 === true)) return null
      if (!(fetchedProduct.isLinearMeter !== false)) return null
      if (!fetchedProduct.productTypeNumber) return null

      if (!fetchedProduct.specs.color) return null
      if (!fetchedProduct.specs.piecesInSquareMeterCm) return null
      if (!fetchedProduct.specs.piecesInPack) return null
      if (!fetchedProduct.specs.squareMetersInPallet) return null
      if (!fetchedProduct.specs.recommendedJointSpacing) return null
      if (!fetchedProduct.specs.thickness) return null
      if (!fetchedProduct.specs.format) return null
      if (!fetchedProduct.specs.recommendedDryMortarVolume) return null
      if (!fetchedProduct.specs.weightOf1PieceGramm) return null
      if (!fetchedProduct.specs.weightOf1SquareMeter) return null
      if (!fetchedProduct.specs.weightOf1PackGramm) return null
      if (!fetchedProduct.specs.manufacturer) return null
      if (!fetchedProduct.specs.countryOfOrigin) return null

      if (!(fetchedProduct.image_original.length >= 1)) return null
      if (!(fetchedProduct.image_thumbnail.length === 2)) return null
      if (!fetchedProduct.image_thumbnail[1]) return null

      return true
    }
    else if (fetchedProduct.productTypeNumber === 10) {

      if (!fetchedProduct.id) return null
      if (!fetchedProduct.type) return null
      if (!fetchedProduct.name) return null
      if (!fetchedProduct.availability) return null
      if (!fetchedProduct.filepath) return null
      if (!fetchedProduct.priceCentsPc) return null
      if (!fetchedProduct.supplierPriceType) return null
      if (!fetchedProduct.priceType) return null
      if (!(fetchedProduct.isM2 === true)) return null
      if (!(fetchedProduct.isLinearMeter !== false)) return null
      if (!fetchedProduct.productTypeNumber) return null
      
      if (!fetchedProduct.specs.color) return null
      if (!fetchedProduct.specs.piecesInSquareMeterCm) return null
      if (!fetchedProduct.specs.piecesInPallet) return null
      if (!fetchedProduct.specs.recommendedJointSpacing) return null
      if (!fetchedProduct.specs.thickness) return null
      if (!fetchedProduct.specs.format) return null
      if (!fetchedProduct.specs.recommendedDryMortarVolume) return null
      if (!fetchedProduct.specs.weightOf1PieceGramm) return null
      if (!fetchedProduct.specs.manufacturer) return null
      if (!fetchedProduct.specs.countryOfOrigin) return null

      if (!(fetchedProduct.image_original.length >= 1)) return null
      if (!(fetchedProduct.image_thumbnail.length === 2)) return null
      if (!fetchedProduct.image_thumbnail[1]) return null

      return true
    }
    else if (fetchedProduct.productTypeNumber === 2) {

      if (!fetchedProduct.id) return null
      if (!fetchedProduct.type) return null
      if (!fetchedProduct.name) return null
      if (!fetchedProduct.availability) return null
      if (!fetchedProduct.filepath) return null
      if (!fetchedProduct.priceCentsPc) return null
      if (!fetchedProduct.supplierPriceType) return null
      if (!fetchedProduct.priceType) return null
      if (!(fetchedProduct.isM2 === true)) return null
      if (!(fetchedProduct.isLinearMeter !== false)) return null
      if (!fetchedProduct.productTypeNumber) return null

      if (!fetchedProduct.specs.color) return null
      if (!fetchedProduct.specs.piecesInSquareMeterCm) return null
      if (!fetchedProduct.specs.piecesInPack) return null
      if (!fetchedProduct.specs.piecesInPallet) return null
      if (!fetchedProduct.specs.recommendedJointSpacing) return null
      if (!fetchedProduct.specs.thickness) return null
      if (!fetchedProduct.specs.format) return null
      if (!fetchedProduct.specs.recommendedDryMortarVolume) return null
      if (!fetchedProduct.specs.weightOf1PieceGramm) return null
      if (!fetchedProduct.specs.weightOf1SquareMeter) return null
      if (!fetchedProduct.specs.weightOf1PackGramm) return null
      if (!fetchedProduct.specs.manufacturer) return null
      if (!fetchedProduct.specs.countryOfOrigin) return null

      if (!(fetchedProduct.image_original.length >= 1)) return null
      if (!(fetchedProduct.image_thumbnail.length === 2)) return null
      if (!fetchedProduct.image_thumbnail[1]) return null

      return true
    }
    else if (fetchedProduct.productTypeNumber === 3) {

      if (!fetchedProduct.id) return null
      if (!fetchedProduct.type) return null
      if (!fetchedProduct.name) return null
      if (!fetchedProduct.availability) return null
      if (!fetchedProduct.filepath) return null
      if (!fetchedProduct.priceCentsPc) return null
      if (!fetchedProduct.supplierPriceType) return null
      if (!fetchedProduct.priceType) return null
      if (fetchedProduct.isM2 === true) return null
      if (fetchedProduct.isLinearMeter === false) return null
      if (!fetchedProduct.productTypeNumber) return null

      if (!fetchedProduct.specs.color) return null
      if (!fetchedProduct.specs.piecesInLinearMeterCm) return null
      if (!fetchedProduct.specs.piecesInPack) return null
      if (!fetchedProduct.specs.piecesInPallet) return null
      if (!fetchedProduct.specs.recommendedJointSpacing) return null
      if (!fetchedProduct.specs.thickness) return null
      if (!fetchedProduct.specs.format) return null
      if (!fetchedProduct.specs.recommendedDryMortarVolume) return null
      if (!fetchedProduct.specs.weightOf1PieceGramm) return null
      if (!fetchedProduct.specs.weightOf1PackGramm) return null
      if (!fetchedProduct.specs.manufacturer) return null
      if (!fetchedProduct.specs.countryOfOrigin) return null

      if (!(fetchedProduct.image_original.length >= 1)) return null
      if (!(fetchedProduct.image_thumbnail.length === 2)) return null
      if (!fetchedProduct.image_thumbnail[1]) return null

      return true
    }
    else if (fetchedProduct.productTypeNumber === 4) {

      if (!fetchedProduct.id) return null
      if (!fetchedProduct.type) return null
      if (!fetchedProduct.name) return null
      if (!fetchedProduct.availability) return null
      if (!fetchedProduct.filepath) return null
      if (!fetchedProduct.priceCentsPc) return null
      if (!fetchedProduct.supplierPriceType) return null
      if (!fetchedProduct.priceType) return null
      if (fetchedProduct.isM2 === true) return null
      if (fetchedProduct.isLinearMeter === true) return null
      if (!fetchedProduct.productTypeNumber) return null

      if (!fetchedProduct.specs.color) return null
      if (!fetchedProduct.specs.piecesInPallet) return null
      if (!fetchedProduct.specs.format) return null
      if (!fetchedProduct.specs.weightOf1PieceGramm) return null
      if (!fetchedProduct.specs.weightOf1PackGramm) return null
      if (!fetchedProduct.specs.manufacturer) return null
      if (!fetchedProduct.specs.countryOfOrigin) return null

      if (!(fetchedProduct.image_original.length >= 1)) return null
      if (!(fetchedProduct.image_thumbnail.length === 2)) return null
      if (!fetchedProduct.image_thumbnail[1]) return null

      return true
    }
  }
}