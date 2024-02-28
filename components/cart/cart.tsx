"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { PulseLoader } from "react-spinners"

import calculateOptions from "@/helpers/calculateOptions"

import CartProduct from "@/components/cart/cart-product"
import Prices from "@/components/product_card/prices/prices"
import ButtonPlus from "@/components/cart/buttons/button-plus"
import ButtonMinus from "@/components/cart/buttons/button-minus"
import ButtonDelete from "@/components/cart/buttons/button-delete"

import { useTriggerUseEffect } from "@/app/[lang]/store"

import { type ProductsProps } from "@/lib/types"

import * as z from 'zod'
import { OrderSchema } from '@/lib/schemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"


const Cart = ({ products, dictionary }: { products: ProductsProps | null | undefined, dictionary: any }) => {

  type FormFields = z.infer<typeof OrderSchema>
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(OrderSchema)
  })

  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [removeNameError, setRemoveNameError] = useState("block")
  const [removePhoneError, setRemovePhoneError] = useState("block")

  useEffect(() => {
    if (errors.name) {
      handleNameError(dictionary["Cart"]["modal"]["errors"]["name"])
    }
    if (errors.phone) {
      handlePhoneError(dictionary["Cart"]["modal"]["errors"]["phone"])
    }
  }, [errors])

  const updateCounters = useTriggerUseEffect(state => state.change)

  type parsedCartType = {
    id: string,
    quantity: number
  }[]

  let parsedCart: parsedCartType = []

  const [cart, setCart] = useState<parsedCartType>([])

  let cartProducts: React.JSX.Element[] = []
  let orderSummary = ""
  let orderProducts: string[] = []

  let totalCostCart = 0
  let totalCostCartLimit = 100000 //Used to set a ceiling on the order total
  let totalSquareMetersCart = 0
  let totalLinearMetersCart = 0
  let totalPacksCart = 0
  let totalPiecesCart = 0
  let totalWeightCart = 0
  let totalPalletsCart = 0

  let subtotalValue = <>{dictionary["Cart"]["buttons"]["empty"]}</>
  let productHTML: React.JSX.Element

  const [buttonProceed, setButtonProceed] = useState("button-hidden")
  const [buttonContinue, setButtonContinue] = useState("")

  const [trigger, setTrigger] = useState(true)

  const [openedModal, setOpenedModal] = useState(false)
  const [modalVisible, setModalVisible] = useState("")

  const switchModal = () => setOpenedModal(!openedModal)

  useEffect(() => {
    const notParsedCart = localStorage.getItem('cart')
    if (notParsedCart) parsedCart = JSON.parse(notParsedCart) || []

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

  const minusButton = (id: string) => {

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

  const plusButton = (id: string) => {
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

  const deleteButton = (id: string) => {

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

    products && products.forEach(product => {
      if (product.id === item.id) {

        const dataArr: (string | number)[] | React.JSX.Element[] | undefined = calculateOptions(product, dictionary, item.quantity)
        if (!dataArr) return null

        //Updating total amounts (start)
        totalCostCart = Number((Number(totalCostCart) + Number(dataArr[0])).toFixed(2))
        totalPiecesCart = (Number(totalPiecesCart) + Number(dataArr[3]))
        totalWeightCart = Number((Number(totalWeightCart) + Number(dataArr[4])).toFixed(2))

        if (product.type !== 'Klinker brick' && product.type !== 'Klinker clay paver') {
          totalPalletsCart = Number((Number(totalPalletsCart) + Number(dataArr[5])).toFixed(2))
          totalPacksCart = (Number(totalPacksCart) + Number(dataArr[2]))
        }
        else totalPalletsCart = Number((Number(totalPalletsCart) + Number(dataArr[7])).toFixed(2))

        if (product.priceType === 3) {
          totalLinearMetersCart = Number((Number(totalLinearMetersCart) + Number(dataArr[1])).toFixed(2))
        }
        else if (product.priceType !== 4) {
          totalSquareMetersCart = Number((Number(totalSquareMetersCart) + Number(dataArr[1])).toFixed(2))
        }
        //Updating total amounts (end)

        //Updating subtotalValue and orderSummary (start)
        let totalItems = ""
        let totalPiecesCartMofified = ''
        let totalPacksCartMofified = ''

        if (cart.length === 1) totalItems = `1 ${dictionary["Cart"]["total"]["item"]}`
        else totalItems = `${cart.length} ${dictionary["Cart"]["total"]["items"]}`

        if (totalPiecesCart === 1) totalPiecesCartMofified = totalPiecesCart + ` ${dictionary["Cart"]["total"]["pc"]}`
        else totalPiecesCartMofified = totalPiecesCart + ` ${dictionary["Cart"]["total"]["pcs"]}`

        if (totalPacksCart === 1) totalPacksCartMofified = totalPacksCart + ` ${dictionary["Cart"]["total"]["pack"]}`
        else totalPacksCartMofified = totalPacksCart + ` ${dictionary["Cart"]["total"]["packs"]}`

        let totalCostCartLength = totalCostCart.toFixed(2).length
        let totalCostCartModified = totalCostCart.toFixed(2)
        if (totalCostCartLength > 6) totalCostCartModified = totalCostCartModified.replace(totalCostCartModified.slice(-6), ',' + totalCostCartModified.slice(-6))

        if (totalSquareMetersCart !== 0 && totalLinearMetersCart !== 0) {
          subtotalValue = (
            <><span className="cart__checkout__subtotal__bold">{dictionary["Cart"]["total"]["total"]}: {dictionary["Currency_symbol"]}{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} {dictionary["Cart"]["total"]["m"]}<sup>2</sup>, {totalLinearMetersCart} {dictionary["Cart"]["total"]["lin"]}, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} {dictionary["Cart"]["total"]["kg"]}, {Number(totalPalletsCart).toFixed(2)} {dictionary["Cart"]["total"]["pal"]}</>
          )
          orderSummary = `${dictionary["Cart"]["total"]["total"]}: ${dictionary["Currency_symbol"]}${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} ${dictionary["Cart"]["total"]["m"]}2, ${totalLinearMetersCart} ${dictionary["Cart"]["total"]["lin"]}, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} ${dictionary["Cart"]["total"]["kg"]}, ${Number(totalPalletsCart).toFixed(2)} ${dictionary["Cart"]["total"]["pal"]}`
        }
        else if (totalSquareMetersCart !== 0) {
          if (totalPacksCart === 0) {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">{dictionary["Cart"]["total"]["total"]}: {dictionary["Currency_symbol"]}{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} {dictionary["Cart"]["total"]["m"]}<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalWeightCart} {dictionary["Cart"]["total"]["kg"]}, {Number(totalPalletsCart).toFixed(2)} {dictionary["Cart"]["total"]["pal"]}</>)
            orderSummary = `${dictionary["Cart"]["total"]["total"]}: ${dictionary["Currency_symbol"]}${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} ${dictionary["Cart"]["total"]["m"]}2, ${totalPiecesCartMofified}, ${totalWeightCart} ${dictionary["Cart"]["total"]["kg"]}, ${Number(totalPalletsCart).toFixed(2)} ${dictionary["Cart"]["total"]["pal"]}`
          }
          else {
            subtotalValue = (<><span className="cart__checkout__subtotal__bold">{dictionary["Cart"]["total"]["total"]}: {dictionary["Currency_symbol"]}{totalCostCartModified} ({totalItems})<br /></span> {totalSquareMetersCart} {dictionary["Cart"]["total"]["m"]}<sup>2</sup>, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} {dictionary["Cart"]["total"]["kg"]}, {Number(totalPalletsCart).toFixed(2)} {dictionary["Cart"]["total"]["pal"]}</>)
            orderSummary = `${dictionary["Cart"]["total"]["total"]}: ${dictionary["Currency_symbol"]}${totalCostCartModified} (${totalItems}) ${totalSquareMetersCart} ${dictionary["Cart"]["total"]["m"]}2, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} ${dictionary["Cart"]["total"]["kg"]}, ${Number(totalPalletsCart).toFixed(2)} ${dictionary["Cart"]["total"]["pal"]}`
          }
        }
        else if (totalLinearMetersCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">{dictionary["Cart"]["total"]["total"]}: {dictionary["Currency_symbol"]}{totalCostCartModified} ({totalItems})<br /></span> {totalLinearMetersCart} {dictionary["Cart"]["total"]["lin"]}, {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} {dictionary["Cart"]["total"]["kg"]}, {Number(totalPalletsCart).toFixed(2)} {dictionary["Cart"]["total"]["pal"]}</>)
          orderSummary = `${dictionary["Cart"]["total"]["total"]}: ${dictionary["Currency_symbol"]}${totalCostCartModified} (${totalItems}) ${totalLinearMetersCart} ${dictionary["Cart"]["total"]["lin"]}, ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} ${dictionary["Cart"]["total"]["kg"]}, ${Number(totalPalletsCart).toFixed(2)} ${dictionary["Cart"]["total"]["pal"]}`
        }
        else if (totalPacksCart !== 0) {
          subtotalValue = (<><span className="cart__checkout__subtotal__bold">{dictionary["Cart"]["total"]["total"]}: {dictionary["Currency_symbol"]}{totalCostCartModified} ({totalItems})<br /></span> {totalPiecesCartMofified}, <br />{totalPacksCartMofified}, {totalWeightCart} {dictionary["Cart"]["total"]["kg"]}, {Number(totalPalletsCart).toFixed(2)} {dictionary["Cart"]["total"]["pal"]}</>)
          orderSummary = `${dictionary["Cart"]["total"]["total"]}: ${dictionary["Currency_symbol"]}${totalCostCartModified} (${totalItems}) ${totalPiecesCartMofified}, ${totalPacksCartMofified}, ${totalWeightCart} ${dictionary["Cart"]["total"]["kg"]}, ${Number(totalPalletsCart).toFixed(2)} ${dictionary["Cart"]["total"]["pal"]}`
        }
        //Updating subtotalValue and orderSummary (end)

        //Forming a product card for Cart or Checkout (start)
        let productTitle = product.type_ru + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;
        if (dictionary["Language"] === "en") productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;

        orderProducts.push(`[${productTitle}]: ${dataArr[2]} packs (${dictionary["Cart"]["subtotal"]["quantity"]}: ${(Number(dataArr[1])).toFixed(2)}), ${dataArr[5]} ${dictionary["Cart"]["total"]["pallets"]}, ${dataArr[4]} ${dictionary["Cart"]["total"]["kg"]}, ${dataArr[3]} ${dictionary["Cart"]["total"]["pcs"]}, ${dictionary["Currency_symbol"]}${dataArr[6]}`)

        let BrickOrPaverOrNot: React.JSX.Element = <></>
        let NotBrickOrPaver: React.JSX.Element = <></>

        if (product.type !== 'Klinker brick' && product.type !== 'Klinker clay paver') {
          BrickOrPaverOrNot = <p className="cart__cont__product__quantity__pallets">{dictionary["Cart"]["subtotal"]["pallets"]}: {dataArr[5]}</p>
          NotBrickOrPaver = <p className="cart__cont__product__quantity__packs">{dictionary["Cart"]["subtotal"]["packs"]}: {dataArr[2]}</p>
        }
        else {
          BrickOrPaverOrNot = <p className="cart__cont__product__quantity__pallets">{dictionary["Cart"]["subtotal"]["pallets"]}: {dataArr[7]}</p>
        }

        let m2OrLinOrPcs
        if (product.priceType === 3) m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">{dictionary["Cart"]["subtotal"]["quantity"]}: {dataArr[1]} {dictionary["Cart"]["total"]["lin"]}</p>
        else if (product.priceType === 4) m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">{dictionary["Cart"]["subtotal"]["quantity"]}: {dataArr[1]}</p>
        else m2OrLinOrPcs = <p className="cart__cont__product__quantity__qty">{dictionary["Cart"]["subtotal"]["quantity"]}: {dataArr[1]} {dictionary["Cart"]["total"]["m"]}&sup2;</p>

        let isImageLink: React.JSX.Element, isTitleImageLink: React.JSX.Element, areButtons: React.JSX.Element, isDelete: React.JSX.Element

        if (!openedModal) {
          isImageLink = (
            <a href={product.filepath}>
              <Image width="350" height="229" className="cart__cont__product__image__img" src={product.image_thumbnail[0]} alt={product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format} loading="lazy" />
            </a>
          )
          isTitleImageLink = (
            <Link href={product.filepath!}>
              <p className="cart__cont__product__title__name">{productTitle}</p>
            </Link>
          )
          areButtons = (
            <div className="cart__cont__product__quantity__buttons">
              <ButtonMinus handleButton={() => minusButton(product.id!)} />
              <ButtonPlus handleButton={() => plusButton(product.id!)} />
            </div>
          )
          isDelete = (
            <ButtonDelete handleButton={() => deleteButton(product.id!)} dictionary={dictionary} />
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
          isDelete = <></>
        }

        productHTML =
          <div className="cart__cont__product">
            <div className="cart__cont__product__image">
              {isImageLink}
            </div>
            <div className="cart__cont__product__price">
              <Prices
                product={product}
                cartType={true}
                dictionary={dictionary}
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
              <p className="cart__cont__product__quantity__pieces">{dictionary["Cart"]["subtotal"]["pieces"]}: {dataArr[3]}</p>
              <p className="cart__cont__product__quantity__weight">{dictionary["Cart"]["subtotal"]["weight"]}: {dataArr[4]}</p>
              {BrickOrPaverOrNot}

              <div className="cart__cont__product__quantity__sub-del">
                <p className="cart__cont__product__quantity__subtotal">{dictionary["Cart"]["subtotal"]["subtotal"]}: {dictionary["Currency_symbol"]}{dataArr[6]}</p>
                {isDelete}
              </div>

            </div>
            <div className="cart__cont__product__save"></div>
            <div className="cart__cont__product__remove"></div>
          </div>

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
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)

  const orderRandom = (Math.random() * 1000).toFixed(0)

  const handleNameError = (error: string) => {
    setRemoveNameError("block")
    setNameError(error)
    setTimeout(() => { setRemoveNameError("none") }, 5000)
  }

  const handlePhoneError = (error: string) => {
    setRemovePhoneError("block")
    setPhoneError(error)
    setTimeout(() => { setRemovePhoneError("none") }, 5000)
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {

    setFormName(data.name)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const d = new Date()
    const month = months[d.getMonth()]
    const day = d.getDay()
    const date = month + ', ' + day

    const order = {
      orderNumber: 'Order #' + orderRandom + ', ',
      name: data.name + ', ',
      total: orderSummary + ', ',
      date: date + ', ',
      phone: data.phone,
      order: orderProducts.join(" ")
    }

    async function send() {

      const res = await fetch('/api/create-order-db', {
        method: 'post',
        body: JSON.stringify(order),
      });

      const sendEmail = await fetch('/api/order-email', {
        method: 'post',
        body: JSON.stringify(order),
      })

      if (!res!) {

      }
      else if (res!) {
        localStorage.removeItem('cart')
        updateCounters()
        setSuccessMessageVisible(true)
      }
    }

    send()
    reset()
  }

  const removeStopScroll = () => document.body.classList.remove("stop-scroll")


  let modalContent: React.JSX.Element
  if (!successMessageVisible) {
    modalContent = (
      <div className="cart__modal__box__content">
        <p className="cart__modal__box__content__title">{dictionary["Cart"]["modal"]["checkout"]}</p>
        <span
          className="cart__modal__box__content__close"
          onClick={switchModal}
        >&times;</span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cart__modal__box__content__form"
        >
          <label htmlFor="name">{dictionary["Cart"]["modal"]["name"]}
            <input
              type="text" id="name"
              className="cart__modal__box__content__form__input" required
              placeholder="..."
              {...register("name")}
            />
          </label>
          {nameError ? <p className="cart__modal__box__content__form__error" style={{ display: removeNameError }}>{nameError}</p> : null}

          <label htmlFor="phone">{dictionary["Cart"]["modal"]["phone"]}
            <input
              type="tel" id="phone"
              className="cart__modal__box__content__form__input" required
              placeholder="81111111111"
              {...register("phone")}
            />
          </label>
          {phoneError ? <p className="cart__modal__box__content__form__error" style={{ display: removePhoneError }}>{phoneError}</p> : null}

          <button
            type="submit" name="submit" id="submit"
            className="cart__modal__box__content__form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ?
              <PulseLoader color={"white"} aria-label="Loading Spinner" size={10} />
              : dictionary["Cart"]["modal"]["place_order"]
            }
          </button>
        </form>

        <button
          className="cart__modal__box__content__continue"
          onClick={switchModal}
        >{dictionary["Cart"]["buttons"]["continue"]}</button>
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
            {dictionary["Cart"]["modal"]["success_message"]["thank_you"]}, {formName}, {dictionary["Cart"]["modal"]["success_message"]["your_order"]} #{orderRandom} {dictionary["Cart"]["modal"]["success_message"]["rest"]}
          </p>
          <Link
            href={'/' + dictionary["Language"]}
            className="cart__modal__box__content__placed__button"
            onClick={removeStopScroll}
          >{dictionary["Cart"]["modal"]["go_to_home_page"]}</Link>
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
          >{dictionary["Cart"]["buttons"]["proceed"]}</button>
          <Link href={'/' + dictionary["Language"]} className={`cart__checkout__continue ${buttonContinue}`}>{dictionary["Cart"]["buttons"]["continue"]}</Link>
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