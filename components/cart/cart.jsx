"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import products from "@/data/products"
import calculateOptions from "@/helpers/calculateOptions"

import CartProduct from "@/components/cart/cart-product"
import Prices from "@/components/product_card/prices/prices"
import ButtonPlus from "@/components/cart/buttons/button-plus"
import ButtonMinus from "@/components/cart/buttons/button-minus"
import ButtonDelete from "@/components/cart/buttons/button-delete"

import { useTriggerUseEffect } from "@/app/store"


const Cart = () => {

  const updateCounters = useTriggerUseEffect(state => state.change)

  const [cart, setCart] = useState("")

  let cartProducts = []
  let orderSummary = ""
  let orderProducts = []

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

  const [trigger, setTrigger] = useState(true)

  const [openedModal, setOpenedModal] = useState(false)
  const [modalVisible, setModalVisible] = useState("")

  const switchModal = () => setOpenedModal(!openedModal)

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
        window.scrollTo(0, 0)
      }
    }

    if (openedModal) {
      setModalVisible("modal--visible")
      document.body.classList.add("stop-scroll")
    }
    else {
      setModalVisible("")
      document.body.classList.remove("stop-scroll")
    }

  }, [trigger, openedModal])

  const minusButton = (id) => {

    cart.forEach((item, index) => {

      if (item.id === id) {

        let updatedCart = [...cart]
        if (item.quantity >= 1) {
          updatedCart[index].quantity--
          localStorage.setItem('cart', JSON.stringify(updatedCart))
          setCart(updatedCart)
          updateCounters()

          if (updatedCart[index].quantity === 0) {
            updatedCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
            updateCounters()
            setTrigger(!trigger)
          }
        }
      }
    })
  }

  const plusButton = (id) => {
    if (totalCostCart >= totalCostCartLimit) return

    cart.forEach((item, index) => {

      if (item.id === id) {

        let updatedCart = [...cart]
        if (item.quantity >= 1) {
          updatedCart[index].quantity++
          localStorage.setItem('cart', JSON.stringify(updatedCart))
          setCart(updatedCart)
        }
      }
    })
  }

  const deleteButton = (id) => {

    cart.forEach((item, index) => {

      if (item.id === id) {

        let updatedCart = [...cart]
        updatedCart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
        updateCounters()
        setTrigger(!trigger)
      }
    })
  }

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

        //Updating total amounts (start)
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
        //Updating total amounts (end)

        //Updating subtotalValue and orderSummary (start)
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
          orderSummary = `Total: €${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} m2, ${totalLinearMetersCart} lin.m, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} kg, ${Number(totalPalletsCart).toFixed(2)} pal`
        }
        else if (totalSquareMetersCart !== 0) {
          if (totalPacksCart === 0) {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} m<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
            orderSummary = `Total: €${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} m2, ${totalPiecesCartMofified}, ${totalWeightCart} kg, ${Number(totalPalletsCart).toFixed(2)} pal`
          }
          else {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} m<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
            orderSummary = `Total: €${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} m2, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} kg, ${Number(totalPalletsCart).toFixed(2)} pal`
          }
        }
        else if (totalLinearMetersCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalLinearMetersCart} lin.m, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
          orderSummary = `Total: €${totalCostCartModified} (${totalItems}) ${totalLinearMetersCart} lin.m, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} kg, ${Number(totalPalletsCart).toFixed(2)} pal`
        }
        else if (totalPacksCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">Total: €{totalCostCartModified} ({totalItems})<br /></span> {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} kg, {Number(totalPalletsCart).toFixed(2)} pal</>)
          orderSummary = `Total: €${totalCostCartModified} (${totalItems}) ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} kg, ${Number(totalPalletsCart).toFixed(2)} pal`
        }
        //Updating subtotalValue and orderSummary (end)

        //Forming a product card for Cart or Checkout (start)
        const productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;
        orderProducts.push(`[${productTitle}]: ${dataObj["totalPacks"]} packs (Quantity: ${(Number(dataObj["totalVolume"])).toFixed(2)}), ${dataObj["totalPallets"]} pallets, ${dataObj["totalWeight"]} kg, ${dataObj["pieces"]} pcs, €${dataObj["priceModified"]}`)

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

        let isImageLink, isTitleImageLink, areButtons, isDelete

        if (!openedModal) {
          isImageLink = (
            <a href={product.filepath}>
              <Image width="350" height="229" className="cart__cont__product__image__img" src={product.image_thumbnail[0]} alt={product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format} loading="lazy" />
            </a>
          )
          isTitleImageLink = (
            <Link href={product.filepath}>
              <p className="cart__cont__product__title__name">{productTitle}</p>
            </Link>
          )
          areButtons = (
            <div className="cart__cont__product__quantity__buttons">
              <ButtonMinus handleButton={() => minusButton(product.id)} />
              <ButtonPlus handleButton={() => plusButton(product.id)} />
            </div>
          )
          isDelete = (
            <ButtonDelete handleButton={() => deleteButton(product.id)} />
          )
        }
        else {
          isImageLink = (
            <Image width="350" height="229" className="cart__cont__product__image__img-checkout" src={product.image_thumbnail[0]} alt={product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format} loading="lazy" />
          )
          isTitleImageLink = (
            <p className="cart__cont__product__title__name-checkout">{productTitle}</p>
          )
          areButtons = (
            <div className="cart__cont__product__quantity__buttons"></div>
          )
          isDelete = ""
        }

        productHTML = (
          <div className="cart__cont__product">
            <div className="cart__cont__product__image">
              {isImageLink}
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
              {isTitleImageLink}
            </div>
            <div className="cart__cont__product__quantity">
              <div className="cart__cont__product__quantity__modify">
                {m2OrLinOrPcs}
                {areButtons}
              </div>

              {NotBrickOrPaver}
              <p className="cart__cont__product__quantity__pieces">Pieces: {dataObj["pieces"]}</p>
              <p className="cart__cont__product__quantity__weight">Weight (kg): {dataObj["totalWeight"]}</p>
              {BrickOrPaverOrNot}

              <div className="cart__cont__product__quantity__sub-del">
                <p className="cart__cont__product__quantity__subtotal">Subtotal: €{dataObj["priceModified"]}</p>
                {isDelete}
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
        //Forming a product card for Cart or Checkout (end)
      }
    })
  })

  // const AddButtonEffect = () => { minusButton.classList.add('cart__cont__product__quantity__buttons__active'); }


  //Handling modal and form (start)
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")

  const handleFormName = (e) => setFormName(e.target.value)
  const handleFormPhone = (e) => setFormPhone(e.target.value)

  const [successMessageVisible, setSuccessMessageVisible] = useState(false)

  const orderRandom = (Math.random() * 1000).toFixed(0)

  const handleForm = () => {

    setSuccessMessageVisible(true)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date()
    const month = months[d.getMonth()]
    const day = d.getDay()
    const date = month + ', ' + day

    const sendOrder = fetch('https://bricks-backend-d8hx.onrender.com/api/orders/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber: 'Order #' + orderRandom + ', ',
        name: formName + ', ',
        total: orderSummary + ', ',
        date: date + ', ',
        phone: formPhone,
        order: orderProducts.join(" ")
      })
    })

    localStorage.removeItem('cart')
    updateCounters()
  }

  const removeStopScroll = () => document.body.classList.remove("stop-scroll")

  let modalContent
  if (!successMessageVisible) {
    modalContent = (
      <div className="cart__modal__box__content">
        <p className="cart__modal__box__content__title">Checkout</p>
        <span
          className="cart__modal__box__content__close"
          onClick={switchModal}
        >&times;</span>

        <form
          onSubmit={handleForm}
          className="cart__modal__box__content__form"
        >
          <label htmlFor="name">Name
            <input
              onChange={(e) => handleFormName(e)}
              value={formName}
              type="text" name="name" id="name"
              className="cart__modal__box__content__form__input" required
            />
          </label>
          <label htmlFor="phone">Phone
            <input
              onChange={(e) => handleFormPhone(e)}
              value={formPhone}
              type="tel" name="phone" id="phone"
              className="cart__modal__box__content__form__input" required />
          </label>
          {/* <label htmlFor="email">Email
            <input type="email" name="email" id="email" className="cart__modal__box__content__form__input" required />
            </label> */}
          <input type="hidden" name="orderString" id="orderString" className="cart__modal__box__content__form__back" />
          <input type="hidden" name="cartString" id="cartString" className="cart__modal__box__content__order__back" />
          <input type="submit" value="Place order" name="submit" id="submit"
            className="cart__modal__box__content__form__submit" />
        </form>

        <button
          className="cart__modal__box__content__continue"
          onClick={switchModal}
        >Continue shopping</button>
        <p className="cart__modal__box__content__subtotal">
          {subtotalValue}
        </p>
        <div className="cart__modal__box__content__order">
          {cartProducts.map(product => product)}
        </div>
      </div>
    )
  }
  else {
    modalContent = (
      <div className="cart__modal__box__content">
        <div className="cart__modal__box__content__placed">
          <p className="cart__modal__box__content__placed__message">
            Thank you, {formName}, your order #{orderRandom} has been formed. We will contact you shortly.
          </p>
          <Link
            href="/"
            className="cart__modal__box__content__placed__button"
            onClick={removeStopScroll}
          >Go to home page</Link>
        </div>
      </div>
    )
  }
  //Handling modal and form (end)


  return (
    <main>
      <div className="cart">
        <div className="cart__checkout">
          <p className="cart__checkout__subtotal">
            {subtotalValue}
          </p>
          <button
            className={`cart__checkout__proceed ${buttonProceed}`}
            onClick={switchModal}
          >Proceed to checkout</button>
          <Link href="/" className={`cart__checkout__continue ${buttonContinue}`}>Continue shopping</Link>
        </div>
        <div className="cart__cont cont">
          {cartProducts.map(product => product)}
        </div>
        <div className={`cart__modal ${modalVisible}`}>
          <div className="cart__modal__box">
            {modalContent}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart