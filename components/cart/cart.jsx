"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import products from "@/data/products"
import CartProduct from "@/components/cart/cart-product"

import calculateOptions from "@/helpers/calculateOptions"

import Prices from "@/components/product_card/prices/prices"


const Cart = () => {

  const [cart, setCart] = useState("")

  let cartProducts = []

  let totalCostCart = 0
  let totalCostCartLimit = 100000 //Used to set a ceiling on the order total
  let totalSquareMetersCart = 0
  let totalLinearMetersCart = 0
  let totalPacksCart = 0
  let totalPiecesCart = 0
  let totalWeightCart = 0
  let totalPalletsCart = 0
  let parsedCart = []

  let subtotalValue = "Cart is empty"
  let productHTML = ""

  const [buttonProceed, setButtonProceed] = useState("button-hidden")
  const [buttonContinue, setButtonContinue] = useState("")

  useEffect(() => {

    parsedCart = JSON.parse(localStorage.getItem('cart')) || []
    if (parsedCart) {
      setCart(parsedCart)

      if (parsedCart[0]) {
      setButtonProceed("")
      setButtonContinue("button-hidden")
      }
      else {
        setButtonProceed("button-hidden")
        setButtonContinue("")
      }
    }
  }, [])

  totalCostCart = 0
  totalSquareMetersCart = 0
  totalLinearMetersCart = 0
  totalPacksCart = 0
  totalPiecesCart = 0
  totalWeightCart = 0
  totalPalletsCart = 0
  cartProducts = []

  cart && cart.forEach(item => {

    products.forEach(product => {
      if (product.id === item.id) {

        const dataObj = calculateOptions(product, item.quantity)

        totalCostCart = (Number(totalCostCart) + Number(dataObj["price"])).toFixed(2)
        totalPiecesCart = (Number(totalPiecesCart) + Number(dataObj["pieces"]))
        totalWeightCart = (Number(totalWeightCart) + Number(dataObj["totalWeight"])).toFixed(2)

        if (product.type !== 'Klinker brick' && product.type !== 'Klinker clay paver') {
          totalPalletsCart = (Number(totalPalletsCart) + Number(dataObj["totalPallets"])).toFixed(2)
          totalPacksCart = (Number(totalPacksCart) + Number(dataObj["totalPacks"]))
        }
        else totalPalletsCart = (Number(totalPalletsCart) + Number(dataObj["totalPalletsNumber"])).toFixed(2)

        if (product.priceType === 3) {
          totalLinearMetersCart = (Number(totalLinearMetersCart) + Number(dataObj["totalVolume"])).toFixed(2)
        }
        else if (product.priceType !== 4) {
          totalSquareMetersCart = (Number(totalSquareMetersCart) + Number(dataObj["totalVolume"])).toFixed(2)
        }

        const productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;

        let BrickOrPaverOrNot
        let NotBrickOrPaver

        if (product.type !== 'Klinker brick' && product.type !== 'Klinker clay paver') {
          BrickOrPaverOrNot = <p className="cart__cont__product__quantity__pallets">Pallets: {dataObj["totalPallets"]}</p>
          NotBrickOrPaver = <p className="cart__cont__product__quantity__packs">Packs: {dataObj["totalPacks"]}</p>
        }
        else {
          BrickOrPaverOrNot = <p className="cart__cont__product__quantity__pallets">Pallets: {dataObj["totalPalletsNumber"]}</p>
        }

        let m2OrLinOrPcs
        if (product.priceType === 3) m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">Quantity: {dataObj["totalVolume"]} lin.m</p>
        else if (product.priceType === 4) m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">Quantity: {dataObj["piecesModified"]}</p>
        else m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">Quantity: {dataObj["totalVolume"]} m&sup2;</p>

        let totalItems = 0
        let totalPiecesCartMofified = ''
        let totalPacksCartMofified = ''

        if (cart.length === 1) totalItems = '1 item'
        else totalItems = `${cart.length} items`

        if (totalPiecesCart === 1) totalPiecesCartMofified = totalPiecesCart + ' pc'
        else totalPiecesCartMofified = totalPiecesCart + ' pcs'

        if (totalPacksCart === 1) totalPacksCartMofified = totalPacksCart + ' pack'
        else totalPacksCartMofified = totalPacksCart + ' packs'

        let totalCostCartLength = String(totalCostCart).length
        let totalCostCartModified = String(totalCostCart)
        if (totalCostCartLength > 6) totalCostCartModified = totalCostCartModified.replace(totalCostCartModified.slice(-6), ',' + totalCostCartModified.slice(-6))

        if (totalSquareMetersCart !== 0 && totalLinearMetersCart !== 0) {
          subtotalValue = (
            <><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} m<sup>2</sup>, {totalLinearMetersCart} lin.m, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>
          )
        }
        else if (totalSquareMetersCart !== 0) {
          if (totalPacksCart === 0) {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} m<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
          }
          else {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} m<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
          }
        }
        else if (totalLinearMetersCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalLinearMetersCart} lin.m, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
        }
        else if (totalPacksCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
        }

        productHTML = (
          <div className="cart__cont__product">
            <div className="cart__cont__product__image">
              <a href={product.filepath}>
                <Image width="350" height="229" className="cart__cont__product__image__img" src={product.image_thumbnail[0]} alt={product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format} loading="lazy" />
              </a>
            </div>
            <div className="cart__cont__product__price">
              <Prices
                product={product}
                cartType={true}
              />
            </div>
            <div className="cart__cont__product__vendor">
              <p className="cart__cont__product__vendor__code">Code:&nbsp;</p>
              <p className="cart__cont__product__vendor__id">{product.id}</p>
            </div>
            <div className="cart__cont__product__title">
              <Link href={product.filepath}>
                <p className="cart__cont__product__title__name">{productTitle}</p>
              </Link>
            </div>
            <div className="cart__cont__product__quantity">
              <div className="cart__cont__product__quantity__modify">
                {m2OrLinOrPcs}
                <div className="cart__cont__product__quantity__buttons">
                  <a className="cart__cont__product__quantity__buttons__minus">-</a>
                  <a className="cart__cont__product__quantity__buttons__plus">+</a>
                </div>
              </div>

              {NotBrickOrPaver}
              <p className="cart__cont__product__quantity__pieces">Pieces: {dataObj["pieces"]}</p>
              <p className="cart__cont__product__quantity__weight">Weight (kg): {dataObj["totalWeight"]}</p>
              {BrickOrPaverOrNot}

              <div className="cart__cont__product__quantity__sub-del">
                <p className="cart__cont__product__quantity__subtotal">Subtotal: €{dataObj["priceModified"]}</p>
                <a className="cart__cont__product__quantity__delete">Delete</a>
              </div>

            </div>
            <div className="cart__cont__product__save"></div>
            <div className="cart__cont__product__remove"></div>
          </div>
        )

        cartProducts.push(
          <CartProduct
            product={productHTML}
            key={item.id}
          />
        )
      }
    })
  })






  return (
    <main>

      <div className="cart">
        <div className="cart__checkout">
          <p className="cart__checkout__subtotal">
            {subtotalValue}
          </p>
          <button className={`cart__checkout__proceed ${buttonProceed}`}>Proceed to checkout</button>
          <Link href="/" className={`cart__checkout__continue ${buttonContinue}`}>Continue shopping</Link>
        </div>
        <div className="cart__cont cont">
          {cartProducts.map(product => product)}
        </div>

        <div className="cart__modal">
          <div className="cart__modal__box">
            <div className="cart__modal__box__content">

              <p className="cart__modal__box__content__title">Checkout</p>
              <span className="cart__modal__box__content__close">&times;</span>

              <form className="cart__modal__box__content__form">
                <label htmlFor="name">Name
                  <input type="text" name="name" id="name" className="cart__modal__box__content__form__input" required />
                </label>
                <label htmlFor="phone">Phone
                  <input type="tel" name="phone" id="phone" className="cart__modal__box__content__form__input" required />
                </label>
                {/* <label htmlFor="email">Email
                  <input type="email" name="email" id="email" className="cart__modal__box__content__form__input" required />
                </label> */}
                <input type="hidden" name="orderString" id="orderString" className="cart__modal__box__content__form__back" />
                <input type="hidden" name="cartString" id="cartString" className="cart__modal__box__content__order__back" />
                <input type="submit" value="Place order" name="submit" id="submit"
                  className="cart__modal__box__content__form__submit" />
              </form>

              <button className="cart__modal__box__content__continue">Continue shopping</button>
              <p className="cart__modal__box__content__subtotal"></p>
              <p className="cart__modal__box__content__order"></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart