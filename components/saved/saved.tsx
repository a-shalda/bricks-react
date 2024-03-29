"use client"

import { useState, useEffect } from "react"
import ShowProducts from "@/components/general/show-products"
import { type ProductsProps } from "@/lib/types"

const Saved = ({ products, dictionary }: { products: ProductsProps | null | undefined, dictionary: any }) => {

  const [savedProductsArr, setSavedProductsArr] = useState<ProductsProps>([])

  let savedProductsIds: string[] = []
  let savedProducts: ProductsProps = []

  useEffect(() => {
    const parsedProducts = localStorage.getItem('wishlist')
    parsedProducts && setSavedProductsArr(JSON.parse(parsedProducts) || [])
  }, [])

  savedProductsArr && savedProductsArr.forEach(wish => {
    savedProductsIds.push(wish["id"]!)
  })

  if(!products) return null

  savedProductsIds.forEach(id => {

    products.forEach(product => {

      if (id === product.id) {
        savedProducts.push(product)
      }
    })
  })

  savedProducts.reverse()


  return (
    <main>
      <section className="cont">
        <h1 className="section__title">{dictionary["Saved"]["title"]}</h1>
        <div className="products">
          <ShowProducts
            products={savedProducts}
            dictionary={dictionary}
          />
        </div>
      </section>
    </main>
  )
}

export default Saved