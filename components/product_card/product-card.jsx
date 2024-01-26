"use client"

import products from "@/data/products"
import Gallery from "@/components/product_card/gallery/gallery"
import Prices from "@/components/product_card/prices/prices"
import PricesOptions from "@/components/product_card/prices/prices-options"
import Buttons from "@/components/product_card/prices/buttons"

import { useState } from "react"
import Link from 'next/link'

const ProductComponent = ({ productId }) => {

  if (!productId) return null
  let product
  products.filter(item => { if (item.id === productId) product = item })
  if (!product) return null
  const productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

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

        <div className="main__cont">
          <h1 className="main__cont__title" itemProp="name">
            {productTitle}
          </h1>
        </div>

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

          <div className="main__window__middle__bottom"></div>
          <div className="main__window__right__top"></div>
          <div className="main__window__right__bottom"></div>

        </div>

        <div className={`modal__cart ${modal}`}>
          <div className="modal__cart__box">
            <div className="modal__cart__box__content">

              <span
                className="modal__cart__box__content__close"
                onPointerDown={handleContinue}
              >
                &times;</span>
              <p className="modal__cart__box__content__message">
                <span className="modal__cart__box__content__message--title">Added to Cart:</span>
                <br></br>
                {toCartMessage}
              </p>
              <Link href="/cart" className="modal__cart__box__content__cart">Go to cart</Link>
              <button
                onPointerDown={handleContinue}
                className="modal__cart__box__content__continue"
              >Continue shopping
              </button>

            </div>
          </div>
        </div>

      </section>

      <section className="additional cont"></section>
      <div className="divider--background">
        <div className="divider cont">
          <p className="divider__desc">Similar products</p>
        </div>
      </div>

      <section className="similar products cont"></section>

    </main>
  )
}

export default ProductComponent