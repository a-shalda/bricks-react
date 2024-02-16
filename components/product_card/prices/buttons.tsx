"use client"

import { useEffect, useState } from "react"
import { useTriggerUseEffect } from "@/app/[lang]/store"
import { type ButtonsProps, countersCartType, countersWishType } from "@/lib/types"


const Buttons = ({ product, quantity, setQuantity, setErrorAdding, handleModal, dictionary }: ButtonsProps) => {

  const packsTotalLimit = 1000

  const [wishButton, setWishButton] = useState(dictionary["Product_Card"]["buttons"]["save"])

  let cart: countersCartType = []
  let wishlist: countersWishType = []

  useEffect(() => {
    const notParsedCart = localStorage.getItem('cart')
    const notParsedWishlist = localStorage.getItem('wishlist')

    if (notParsedCart) cart = JSON.parse(notParsedCart) || []
    if (notParsedWishlist) wishlist = JSON.parse(notParsedWishlist) || []

    if (wishlist.length === 0) return

    const wish = {
      id: product.id,
    }

    wishlist.filter(item => {
      if (item.id === wish.id) {
        setWishButton(dictionary["Product_Card"]["buttons"]["unsave"])
      }
    })
  })

  const updateCounters = useTriggerUseEffect(state => state.change)

  const modifyWishlist = () => {

    const wish = {
      id: product.id,
    };

    let mathingIndex: number | undefined

    wishlist.filter((item, index) => {
      if (item.id === wish.id) {
        mathingIndex = index
      }
    })

    if (mathingIndex === undefined) {
      wishlist.push(wish)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setWishButton(dictionary["Product_Card"]["buttons"]["unsave"])
    }
    else {
      wishlist.splice(mathingIndex, 1)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setWishButton(dictionary["Product_Card"]["buttons"]["save"])
    }
    updateCounters()
  }

  let userQuantity: number

  const addToCart = () => {
    userQuantity = quantity

    if (userQuantity !== 0) {

      const order = {
        id: product.id,
        quantity: userQuantity
      };

      let mathingIndex: number | undefined

      cart.filter((item, index) => {
        if (item.id === order.id) {
          mathingIndex = index
        }
      })

      if (mathingIndex === undefined) {
        cart.push(order)
      }
      else {
        if ((cart[mathingIndex].quantity + userQuantity) <= packsTotalLimit) {
          cart[mathingIndex].quantity += userQuantity
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      handleModal()
      setQuantity(0)

      updateCounters()
    }
    else {
      setErrorAdding("main__window__middle__top__stock__subtotal__value__select__focus")
      setTimeout(() => {
        setErrorAdding("")
      }, 300);
    }
  }


  return (
    <div className="main__window__middle__top__buy">
      <button
        onClick={modifyWishlist}
        className="main__window__middle__top__buy__button_wish"
      >
        <img src="/images/icons/heart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
          width="18" height="18" alt="heart" />
        <span className="main__window__middle__top__buy__button_wish__text">
          {wishButton}
        </span>
      </button>

      <button
        onClick={addToCart}
        className="main__window__middle__top__buy__button_add"
      >
        <img src="/images/icons/cart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
          width="18" height="18" alt="heart" />
        <span className="main__window__middle__top__buy__button_wish__text">{dictionary["Product_Card"]["buttons"]["add"]}</span>
      </button>
    </div>
  )
}

export default Buttons