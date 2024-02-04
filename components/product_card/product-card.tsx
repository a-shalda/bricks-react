"use client"

import products from "@/data/products"
import Gallery from "@/components/product_card/gallery/gallery"
import Prices from "@/components/product_card/prices/prices"
import PricesOptions from "@/components/product_card/prices/prices-options"
import Buttons from "@/components/product_card/prices/buttons"
import Modal from "@/components/product_card/prices/modal"
import ProductCardTitle from "@/components/product_card/product-card-title"
import Specs from "@/components/product_card/specs"
import Similar from "@/components/product_card/similar"
import Additional from "@/components/product_card/additional"

import { type ProductProps } from "@/lib/types"
import { SampleProduct } from "@/lib/types"

import { useState } from "react"

const ProductComponent = ({ productId }: { productId: string }) => {

  if (!productId) return null
  if (!products) return null

  let array: string[] = []

  let product: ProductProps = SampleProduct

  products.forEach(item => {
    if (item) {
      array.push(item.id)
      if (item.id === productId) {
        product = item
      }
    }
  })

  if(!(array.includes(productId))) return null

  const [quantity, setQuantity] = useState(0)
  const [errorAdding, setErrorAdding] = useState("")

  const [toCartMessage, setToCartMessage] = useState("")

  const [modal, setModal] = useState("")

  const handleModal = () => {
    setModal("modal--visible")
    document.body.classList.add('stop-scroll')
  }

  const handleContinue = () => {
    setModal("modal--hidden")
    document.body.classList.remove('stop-scroll');
  }

  return (
    <main itemScope itemType="https://schema.org/Product">
      <section className="main cont">

        <ProductCardTitle product={product} />

        <div className="main__window">
          <Gallery product={product} />

          <div className="main__window__middle__top">
            <Prices product={product} />

            <PricesOptions
              product={product}
              setQuantity={setQuantity}
              quantity={quantity}
              errorAdding={errorAdding}
              setToCartMessage={setToCartMessage}
            />

            <Buttons
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              setErrorAdding={setErrorAdding}
              handleModal={handleModal}
            />
          </div>

          <Specs product={product} />

          <div className="main__window__right__top"></div>
          <div className="main__window__right__bottom"></div>
        </div>

        <Modal
          modal={modal}
          handleContinue={handleContinue}
          toCartMessage={toCartMessage}
        />
      </section>

      <Additional
        product={product}
      />

      <Similar
        products={products}
        type={product?.type}
        color={product?.specs.color}
        product={product}
        quantity={5}
      />

    </main>
  )
}

export default ProductComponent