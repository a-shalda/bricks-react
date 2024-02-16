// type PriceType = 1 | 2 | 3 | 4
// type ProductType = "Klinker brick slip" | "Klinker brick" | "Klinker stair tile" | "Klinker floor tile" | "Thermopanel" | "Ceramic fence cap" | "Klinker clay paver" | "Ceramic window sill" | "Mortar"
type PriceType = number
type ProductType = string

export type ProductPropsAll = {
  id?: string,
  type?: ProductType,
  name?: string,
  availability?: string,
  filepath?: string,
  priceCentsM2?: number,
  priceCentsPc?: number,
  supplierPriceType?: string,
  priceType?: PriceType,
  isM2?: boolean,
  isLinearMeter?: boolean,
  description?: string,
  productTypeNumber?: number,
  specs: {
    color?: string,
    piecesInSquareMeterCm?: number,
    piecesInLinearMeterCm?: number,
    piecesInPack?: number,
    piecesInPallet?: number,
    squareMetersInPallet?: number,
    recommendedJointSpacing?: string,
    thickness?: number,
    format?: string,
    recommendedDryMortarVolume?: string,
    weightOf1PieceGramm?: number,
    weightOf1SquareMeter?: number,
    weightOf1PackGramm?: number,
    manufacturer?: string,
    countryOfOrigin?: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductsPropsAll = ProductPropsAll[]


export type ProductPropsTypeOne = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsM2: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  productTypeNumber: number,
  specs: {
    color: string,
    piecesInSquareMeterCm: number,
    piecesInPack: number,
    squareMetersInPallet: number,
    recommendedJointSpacing: string,
    thickness: number,
    format: string,
    recommendedDryMortarVolume: string,
    weightOf1PieceGramm: number,
    weightOf1SquareMeter: number,
    weightOf1PackGramm: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductPropsTypeOnePallet = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsPc: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  productTypeNumber: number,
  specs: {
    color: string,
    piecesInSquareMeterCm: number,
    piecesInPack: number,
    piecesInPallet: number,
    recommendedJointSpacing: string,
    thickness: number,
    format: string,
    recommendedDryMortarVolume: string,
    weightOf1PieceGramm: number,
    weightOf1SquareMeter: number,
    weightOf1PackGramm: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductPropsTypeTwo = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsPc: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  productTypeNumber: number,

  specs: {
    color: string,
    piecesInSquareMeterCm: number,
    piecesInPallet: number,
    recommendedJointSpacing: string,
    thickness: number,
    format: string,
    recommendedDryMortarVolume: string,
    weightOf1PieceGramm: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductPropsTypeThree = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsPc: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  productTypeNumber: number,
  specs: {
    color: string,
    piecesInLinearMeterCm: number,
    piecesInPack: number,
    piecesInPallet: number,
    recommendedJointSpacing: string,
    thickness: number,
    format: string,
    recommendedDryMortarVolume: string,
    weightOf1PieceGramm: number,
    weightOf1PackGramm: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductPropsTypeFour = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsPc: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  productTypeNumber: number,
  specs: {
    color: string,
    piecesInPallet: number,
    format: string,
    weightOf1PieceGramm: number,
    weightOf1PackGramm: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}
export type ProductProps = ProductPropsTypeOne | ProductPropsTypeOnePallet | ProductPropsTypeTwo | ProductPropsTypeThree | ProductPropsTypeFour
export type ProductsProps = ProductProps[]


export const SampleProduct = {
  specs: {},
  image_original: [],
  image_thumbnail: []
}

export type SliderProps = {
  img: string,
  title: string,
  desc: string,
  path: string,
  linkText: string,
  id: number
}

export type OptionProps = {
  order?: string,
  product: ProductPropsAll,
  totalPacks?: number,
  totalVolume?: number,
  priceModified?: string,
  totalPacksModified?: string,
  piecesModified?: string,
  totalWeight?: number,
  totalPallets?: number
}

export type SimilarProps = {
  products: ProductsProps,
  type: string | undefined,
  color: string | undefined,
  product: ProductProps,
  quantity: number
}

export type ShowProductsProps = {
  products?: ProductsProps | null | undefined,
  product?: ProductProps,
  quantity?: number,
  type?: string,
  color?: string,
}

export type GenerateProductsProps = {
  product: ProductProps,
  index: number
}

export type ProductCardProps = {
  product: ProductProps,
  index: number,
  priceM?: string,
  pricePc: string
}

export type SpecProps = {
  leftProp: string | number,
  rightProp: string | number | undefined
}

export interface specsObjProps {
  [key: number]: [string | number, number | string | undefined],
}

export type PricesOptionsProps = {
  product: ProductProps,
  setQuantity: (e: number) => void,
  quantity: number,
  errorAdding: string,
  setToCartMessage: (e: string) => void,
}

export type ModalProps = {
  modal: string,
  handleContinue: () => void,
  toCartMessage: string
}

export type ButtonsProps = {
  product: ProductProps,
  quantity: number,
  setQuantity: (e: number) => void,
  setErrorAdding: (e: string) => void,
  handleModal: () => void,
}

export type ThumbnailProps = {
  image: string,
  index: number,
  alt: string,
  current: number,
  changeIndexThumbnail: (e: number) => void
}

export type ThumbnailsProps = {
  product: ProductProps,
  current: number,
  changeIndexThumbnail: (e: number) => void
}

export type ImageCompProps = {
  image: string,
  index: number,
  alt: string,
  current: number,
  handleModal: (e: string) => void,
}

type sliderItemsProps = {
  img: string,
  title: string,
  desc: string,
  path: string,
  linkText: string,
  id: number,
}

export type SlideProps = {
  item: sliderItemsProps,
  index: number,
  current: number
}

export type CategoryProps = {
  id: string,
  img: string,
  title: string,
  path: string,
}

export type CategoriesProps = CategoryProps[]

export type LowerButtonsProps = {
  handlePointerDown: (e: number) => void
  current: number,
  dictionary: any
}

export type LowerButtonProp = {
  index: number,
  handlePointerDown: (e: number) => void,
  current: number
}

export type countersCartType = {
  id: string | undefined,
  quantity: number
}[]

export type countersWishType = {
  id: string | undefined
}[]