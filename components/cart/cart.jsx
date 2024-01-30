"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import products from "@/data/products"
import CartProduct from "@/components/cart/cart-product"


const Cart = () => {

  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
  }, [])

  let cartProducts = []
  let quantityPacks = 0

  cart.forEach(item => {
    products.forEach(product => {
      if (product.id === item.id) {
        quantityPacks = item.quantity

        cartProducts.push(
          <CartProduct
            product={product}
            cartQuantity={item.quantity}
            key={item.id}
          />
        )
      }
    })
  })

  console.log(cartProducts)


  return (
    <main>

      <div className="cart">
        <div className="cart__checkout">
          <p className="cart__checkout__subtotal"></p>
          <button className="cart__checkout__proceed">Proceed to checkout</button>
          <Link href="/" className="cart__checkout__continue">Continue shopping</Link>
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