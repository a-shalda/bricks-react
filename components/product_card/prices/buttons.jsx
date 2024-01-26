"use client"

import { useEffect, useState } from "react"

const Buttons = ({ product, quantity, setQuantity, setErrorAdding, handleModal }) => {

  const packsTotalLimit = 1000

  const [wishButton, setWishButton] = useState("Save")

  let cart
  let wishlist

  useEffect(() => {
    cart = JSON.parse(localStorage.getItem('cart')) || []
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

    if (wishlist.length === 0) return

    const wish = {
      id: product.id,
    }

    wishlist.filter(item => {
      if (item.id === wish.id) {
        setWishButton("Unsave")
      }
    })
  })


  const modifyWishlist = () => {

    const wish = {
      id: product.id,
    };

    let mathingIndex;

    wishlist.filter((item, index) => {
      if (item.id === wish.id) {
        mathingIndex = index
      }
    })

    if (mathingIndex === undefined) {
      wishlist.push(wish)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setWishButton("Unsave")
    }
    else {
      wishlist.splice([mathingIndex], 1)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setWishButton("Save")
    }
  }

  let userQuantity

  const addToCart = () => {
    userQuantity = quantity

    if (userQuantity !== 0) {
      console.log(cart)

      const order = {
        id: product.id,
        quantity: userQuantity
      };

      let mathingIndex;

      cart.forEach((item, index) => {
        if (item.id === order.id && item.type === order.type) {
          mathingIndex = index;
        }
      })

      if (mathingIndex === undefined) {
        cart.push(order);
      }
      else {
        if ((cart[mathingIndex].quantity + userQuantity) <= packsTotalLimit) {
          cart[mathingIndex].quantity += userQuantity;
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      handleModal()
      setQuantity(0)

      // updateCounters();
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
        onPointerDown={modifyWishlist}
        className="main__window__middle__top__buy__button_wish"
      >
        <img src="/images/icons/heart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
          width="18" height="18" alt="heart" />
        <span className="main__window__middle__top__buy__button_wish__text">
          {wishButton}
        </span>
      </button>

      <button
        onPointerDown={addToCart}
        className="main__window__middle__top__buy__button_add"
      >
        <img src="/images/icons/cart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
          width="18" height="18" alt="heart" />
        <span className="main__window__middle__top__buy__button_wish__text">Add</span>
      </button>
    </div>
  )
}

export default Buttons