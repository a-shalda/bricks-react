// type PriceType = 1 | 2 | 3 | 4
// type ProductType = "Klinker brick slip" | "Klinker brick" | "Klinker stair tile" | "Klinker floor tile" | "Thermopanel" | "Ceramic fence cap" | "Klinker clay paver" | "Ceramic window sill" | "Mortar"
type PriceType = number
type ProductType = string

export type ProductProps = {
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

export type ProductPropsFetchedRaw = {
  id: string | null,
  type: ProductType | null,
  name: string | null,
  availability: string | null,
  filepath: string | null,
  priceCentsM2?: number | null,
  priceCentsPc?: number | null,
  supplierPriceType: string | null,
  priceType: PriceType | null,
  isM2: boolean | null,
  isLinearMeter: boolean | null,
  description?: string | null,

  specs__color?: string | null,
  specs__piecesInSquareMeterCm?: number | null,
  specs__piecesInLinearMeterCm?: number | null,
  specs__piecesInPack?: number | null,
  specs__piecesInPallet?: number | string | null,
  specs__squareMetersInPallet?: number | null,
  specs__recommendedJointSpacing?: string | null,
  specs__thickness?: number | null,
  specs__format?: string | null,
  specs__recommendedDryMortarVolume?: string | null,
  specs__weightOf1PieceGramm: number | null,
  specs__weightOf1SquareMeter?: number | null,
  specs__weightOf1PackGramm?: number | null,
  specs__manufacturer?: string | null,
  specs__countryOfOrigin?: string | null,

  image_original__001?: string | null,
  image_original__002?: string | null,
  image_original__003?: string | null,
  image_original__004?: string | null,
  image_original__005?: string | null,
  image_original__006?: string | null,
  image_original__007?: string | null,
  image_original__008?: string | null,
  image_original__009?: string | null,
  image_original__010?: string | null,
  image_original__011?: string | null,
  image_original__012?: string | null,
  image_original__013?: string | null,
  image_original__014?: string | null,
  image_original__015?: string | null,
  image_original__016?: string | null,
  image_original__017?: string | null,
  image_original__018?: string | null,
  image_original__019?: string | null,
  image_original__020?: string | null,
  image_thumbnail__001?: string | null,
  image_thumbnail__002?: string | null,
}

export type ProductsPropsFetchedRaw = ProductPropsFetchedRaw[]


export type ProductsProps = ProductProps[]

export const SampleProduct = {
  specs: {},
  image_original: [],
  image_thumbnail: []
}

export const SampleProductOneFetch = {
  specs: {},
  image_original: [],
  image_thumbnail: []
}

export type OptionProps = {
  order?: string,
  product: ProductProps,
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
  img_800: string,
  title: string,
  desc: string,
  path: string,
  id: number,
}

export type SlideProps = {
  item: sliderItemsProps,
  index: number,
  current: number
}

export type LowerButtonsProps = {
  handlePointerDown: (e: number) => void
  current: number
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