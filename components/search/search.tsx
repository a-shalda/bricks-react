"use client"

import Image from "next/image"
import ShowProducts from "@/components/general/show-products"

import { useState } from "react"
import { type ProductsProps } from "@/lib/types"


const Search = ({ products }: { products: ProductsProps | null | undefined }) => {

  const [inputFocus, setInputFocus] = useState("")
  const handleOnFocus = () => setInputFocus("search__focus")
  const handleBlur = () => setInputFocus("")

  const [productsBlurred, setProductsBlurred] = useState("")

  const [foundProductsDisplay, setFoundProductsDisplay] = useState<ProductsProps>([])

  if (!products) return null

  const searchLimit = 30
  let foundProducts: ProductsProps = []

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    setProductsBlurred("")

    setTimeout(() => {

      foundProducts = []

      let input: string = ""

      for (let i = 0; i < products.length; i++) {

        input = ((e.target as HTMLInputElement).value).toLowerCase()
        
        const id = (products[i].id!).toLowerCase()
        const name = (products[i].name!).toLowerCase()
        const manufacturer = (products[i].specs?.manufacturer!).toLowerCase()
        const format = (products[i].specs?.format!).toLowerCase()
        const type = (products[i].type!).toLowerCase()

        if (id.includes(`${input}`) || name.includes(`${input}`) || manufacturer.includes(`${input}`) || format.includes(`${input}`) || type.includes(`${input}`)) {
          foundProducts.push(products[i])
        }
      }

      if (foundProducts.length > searchLimit) foundProducts = foundProducts.slice(0, searchLimit)

      if (input.length === 0) {
        foundProducts = []
        setFoundProductsDisplay(foundProducts)
        setProductsBlurred("")
      }

      setFoundProductsDisplay(foundProducts)
      setProductsBlurred("search--not-blurred")
    }, 300)
  }


  return (
    <main>
      <section className="cont">
        <h1 className="section__title">Search</h1>

        <div className={`search ${inputFocus}`}>
          <Image
            src="/images/icons/search.svg"
            className="icon-style-search search__icon--not-active"
            alt="search"
            width="42"
            height="22"
          />
          <input
            onFocus={handleOnFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="search__form"
            type="text"
            placeholder="example: r685nf14"
          />
        </div>

        <div className={`products search--blurred ${productsBlurred}`}>
          <ShowProducts
            products={foundProductsDisplay}
          />
        </div>
      </section>
    </main>
  )
}

export default Search