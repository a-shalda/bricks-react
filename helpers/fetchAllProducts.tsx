import { supabase } from "@/lib/db";
import { type ProductProps, type ProductsProps, SampleProductOneFetch } from "@/lib/types";


export default async function getAllProducts() {

  let updatedProducts: ProductsProps = []
  const { data } = await supabase.from('products').select()

  if (data !== null) {
    for (let i = 0; i < data.length; i++) {

      let newProduct: ProductProps = JSON.parse(JSON.stringify(SampleProductOneFetch))

      if (data[i].id) newProduct.id = data[i].id!
      else return null

      if (data[i].type) newProduct.type = data[i].type!
      if (data[i].name) newProduct.name = data[i].name!
      if (data[i].availability) newProduct.availability = data[i].availability!
      if (data[i].filepath) newProduct.filepath = data[i].filepath!
      if (data[i].priceCentsM2) newProduct.priceCentsM2 = data[i].priceCentsM2!
      if (data[i].priceCentsPc) newProduct.priceCentsPc = data[i].priceCentsPc!
      if (data[i].supplierPriceType) newProduct.supplierPriceType = data[i].supplierPriceType!
      if (data[i].priceType) newProduct.priceType = data[i].priceType!
      if (data[i].isM2) newProduct.isM2 = data[i].isM2!
      if (data[i].isLinearMeter) newProduct.isLinearMeter = data[i].isLinearMeter!
      if (data[i].description) newProduct.description = data[i].description!

      if (data[i].specs__color) newProduct.specs.color = data[i].specs__color!
      if (data[i].specs__piecesInSquareMeterCm) newProduct.specs.piecesInSquareMeterCm = data[i].specs__piecesInSquareMeterCm!
      if (data[i].specs__piecesInLinearMeterCm) newProduct.specs.piecesInLinearMeterCm = data[i].specs__piecesInLinearMeterCm!
      if (data[i].specs__piecesInPack) newProduct.specs.piecesInPack = data[i].specs__piecesInPack!
      if (data[i].specs__piecesInPallet) newProduct.specs.piecesInPallet = Number(data[i].specs__piecesInPallet!)
      if (data[i].specs__squareMetersInPallet) newProduct.specs.squareMetersInPallet = data[i].specs__squareMetersInPallet!
      if (data[i].specs__recommendedJointSpacing) newProduct.specs.recommendedJointSpacing = data[i].specs__recommendedJointSpacing!
      if (data[i].specs__thickness) newProduct.specs.thickness = data[i].specs__thickness!
      if (data[i].specs__format) newProduct.specs.format = data[i].specs__format!
      if (data[i].specs__recommendedDryMortarVolume) newProduct.specs.recommendedDryMortarVolume = data[i].specs__recommendedDryMortarVolume!
      if (data[i].specs__weightOf1PieceGramm) newProduct.specs.weightOf1PieceGramm = data[i].specs__weightOf1PieceGramm!
      if (data[i].specs__weightOf1SquareMeter) newProduct.specs.weightOf1SquareMeter = data[i].specs__weightOf1SquareMeter!
      if (data[i].specs__weightOf1PackGramm) newProduct.specs.weightOf1PackGramm = data[i].specs__weightOf1PackGramm!
      if (data[i].specs__manufacturer) newProduct.specs.manufacturer = data[i].specs__manufacturer!
      if (data[i].specs__countryOfOrigin) newProduct.specs.countryOfOrigin = data[i].specs__countryOfOrigin!

      if (data[i].image_original__001) newProduct.image_original[0] = data[i].image_original__001!
      if (data[i].image_original__002) newProduct.image_original[1] = data[i].image_original__002!
      if (data[i].image_original__003) newProduct.image_original[2] = data[i].image_original__003!
      if (data[i].image_original__004) newProduct.image_original[3] = data[i].image_original__004!
      if (data[i].image_original__005) newProduct.image_original[4] = data[i].image_original__005!
      if (data[i].image_original__006) newProduct.image_original[5] = data[i].image_original__006!
      if (data[i].image_original__007) newProduct.image_original[6] = data[i].image_original__007!
      if (data[i].image_original__008) newProduct.image_original[7] = data[i].image_original__008!
      if (data[i].image_original__009) newProduct.image_original[8] = data[i].image_original__009!
      if (data[i].image_original__010) newProduct.image_original[9] = data[i].image_original__010!
      if (data[i].image_original__011) newProduct.image_original[10] = data[i].image_original__011!
      if (data[i].image_original__012) newProduct.image_original[11] = data[i].image_original__012!
      if (data[i].image_original__013) newProduct.image_original[12] = data[i].image_original__013!
      if (data[i].image_original__014) newProduct.image_original[13] = data[i].image_original__014!
      if (data[i].image_original__015) newProduct.image_original[14] = data[i].image_original__015!
      if (data[i].image_original__016) newProduct.image_original[15] = data[i].image_original__016!
      if (data[i].image_original__017) newProduct.image_original[16] = data[i].image_original__017!
      if (data[i].image_original__018) newProduct.image_original[17] = data[i].image_original__018!
      if (data[i].image_original__019) newProduct.image_original[18] = data[i].image_original__019!
      if (data[i].image_original__020) newProduct.image_original[19] = data[i].image_original__020!

      if (data[i].image_thumbnail__001) newProduct.image_thumbnail[0] = data[i].image_thumbnail__001!
      if (data[i].image_thumbnail__002) newProduct.image_thumbnail[1] = data[i].image_thumbnail__002!

      updatedProducts.push(newProduct)
    }
    return updatedProducts
  }
}