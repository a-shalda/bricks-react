import { type ProductsProps, type ProductProps, SampleProduct } from "@/lib/types"


export default function selectOneProduct(fetchedProducts: ProductsProps, productId: string) {
  
  let productsHaveProductId: string[] = []

  let product: ProductProps = JSON.parse(JSON.stringify(SampleProduct))

  fetchedProducts.forEach(item => {
    if (item) {
      productsHaveProductId.push(item.id!)
      if (item.id === productId) {
        product = JSON.parse(JSON.stringify(item))
      }
    }
  })

  if(!(productsHaveProductId.includes(productId))) return null
  else if ((productsHaveProductId.includes(productId))) return product
}