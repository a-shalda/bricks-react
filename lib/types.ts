// type PriceType = 1 | 2 | 3 | 4
// type ProductType = "Klinker brick slip" | "Klinker brick" | "Klinker stair tile" | "Klinker floor tile" | "Thermopanel" | "Ceramic fence cap" | "Klinker clay paver" | "Ceramic window sill" | "Mortar"
type PriceType = number
type ProductType = string

export type ProductProps = {
  id: string,
  type: ProductType,
  name: string,
  availability: string,
  filepath: string,
  priceCentsM2?: number,
  priceCentsPc?: number,
  supplierPriceType: string,
  priceType: PriceType,
  isM2: boolean,
  isLinearMeter: boolean,
  description?: string,
  specs: {
    color: string,
    piecesInSquareMeterCm?: number,
    piecesInLinearMeterCm?: number,
    piecesInPack?: number,
    piecesInPallet?: number,
    squareMetersInPallet?: number,
    recommendedJointSpacing?: string,
    thickness?: number,
    format: string,
    recommendedDryMortarVolume?: string,
    weightOf1PieceGramm: number,
    weightOf1SquareMeter?: number,
    weightOf1PackGramm?: number,
    manufacturer: string,
    countryOfOrigin: string,
  },
  image_original: string[],
  image_thumbnail: string[]
}

export type ProductsProps = ProductProps[]

export const SampleProduct = {
  id: 'r788nf9',
  type: 'Klinker brick slip',
  name: 'R788NF9 planto ardor venito',
  availability: 'In Stock',
  filepath: '/shop/feldhaus_klinker/r788nf9',
  supplierPriceType: 'm2',
  priceType: 1,
  isM2: true,
  isLinearMeter: false,

  specs: {
    color: 'red',
    format: '240x71x9',
    weightOf1PieceGramm: 36,
    manufacturer: 'Feldhaus Klinker',
    countryOfOrigin: 'Germany',
  },

  image_original: [
    '/images/product_images/brick_slip/feldhaus_klinker/r788nf9/main/r788nf9_main.webp',
  ],

  image_thumbnail: [
    '/images/product_images/brick_slip/feldhaus_klinker/r788nf9/thumbnail/r788nf9_thumbnail_main.webp',
  ]
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
  products: ProductsProps,
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
  id: string,
  quantity: number
}[]

export type countersWishType = {
  id: string
}[]