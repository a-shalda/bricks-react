"use client"

import { useState, useEffect } from "react"
import products from "@/data/products"
import ShowProducts from "@/components/general/show-products"

const Saved = () => {

  const [savedProductsArr, setSavedProductsArr] = useState([])

  let savedProductsIds = []
  let savedProducts = []

  useEffect(() => {
    setSavedProductsArr(JSON.parse(localStorage.getItem('wishlist')) || [])
  }, [])

  savedProductsArr.forEach(wish => {
    savedProductsIds.push(wish["id"])
  })

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
        <h1 className="section__title">Saved products</h1>
        <div className="products">
          <ShowProducts
            products={savedProducts}
          />
        </div>
      </section>
    </main>
  )
}

export default Saved