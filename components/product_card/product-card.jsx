"use client"

import products from "@/data/products"
import Gallery from "@/components/product_card/gallery/gallery"
import Prices from "@/components/product_card/prices/prices"
import PricesOptions from "@/components/product_card/prices/prices-options"
import Buttons from "@/components/product_card/prices/buttons"
import Modal from "@/components/product_card/prices/modal"
import Divider from "@/components/general/divider"
import ProductCardTitle from "@/components/product_card/product-card-title"
import Specs from "@/components/product_card/specs"

import { useState } from "react"

const ProductComponent = ({ productId }) => {

  if (!productId) return null
  let product
  products.filter(item => { if (item.id === productId) product = item })
  if (!product) return null

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

          <Specs product={product}/>

          <div className="main__window__right__top"></div>
          <div className="main__window__right__bottom"></div>
        </div>

        <Modal
          modal={modal}
          handleContinue={handleContinue}
          toCartMessage={toCartMessage}
        />
      </section>

      <section className="additional cont"></section>

      <Divider label={"Similar products"} />

      <section className="similar products cont"></section>
    </main>
  )
}

export default ProductComponent