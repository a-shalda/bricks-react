"use client"

import Gallery from "@/components/product_card/gallery/gallery"
import Prices from "@/components/product_card/prices/prices"
import PricesOptions from "@/components/product_card/prices/prices-options"
import Buttons from "@/components/product_card/prices/buttons"
import Modal from "@/components/product_card/prices/modal"
import ProductCardTitle from "@/components/product_card/product-card-title"
import Specs from "@/components/product_card/specs"
import Similar from "@/components/product_card/similar"
import Additional from "@/components/product_card/additional"

import { useState } from "react"
import { type ProductProps, type ProductsProps } from "@/lib/types"


const ProductComponent = ({ product, products, dictionary }: { product: ProductProps, products: ProductsProps, dictionary: any }) => {

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

        <ProductCardTitle product={product} dictionary={dictionary} />

        <div className="main__window">
          <Gallery product={product} />

          <div className="main__window__middle__top">
            <Prices product={product} dictionary={dictionary} />

            <PricesOptions
              product={product}
              setQuantity={setQuantity}
              quantity={quantity}
              errorAdding={errorAdding}
              setToCartMessage={setToCartMessage}
              dictionary={dictionary}
            />

            <Buttons
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              setErrorAdding={setErrorAdding}
              handleModal={handleModal}
              dictionary={dictionary}
            />
          </div>

          <Specs product={product} dictionary={dictionary} />

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
        dictionary={dictionary}
      />

      <Similar
        products={products}
        type={product?.type}
        color={product?.specs.color}
        product={product}
        quantity={5}
        dictionary={dictionary}
      />

    </main>
  )
}

export default ProductComponent