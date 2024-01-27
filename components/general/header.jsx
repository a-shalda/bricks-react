"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import Image from "next/image"
import { useTriggerUseEffect } from "@/app/store"

const Dropdown = () => {

  return (
    <div className="header__upper__left__hamburger__dropdown">
      <div className="header__upper__left__hamburger__dropdown__content">
        <ul className="header__upper__left__hamburger__dropdown__ul">
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/catalog.html">All products</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/brick_slips.html">Klinker brick slips</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/bricks.html">Klinker bricks</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/thermopanels.html">Brick slip thermo panels</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/fence_caps.html">Ceramic fence caps</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/clay_pavers.html">Clay pavers</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/stair_and_floor_tile.html">Stair and floor tile</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/window_sills.html">Ceramic window sills</Link></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/mortars.html">Mortars</Link></li>
        </ul>
      </div>
    </div>
  )
}

const Header = () => {

  const trigger = useTriggerUseEffect(state => state.triggerUseEffect)

  // localStorage.removeItem('cart');
  // localStorage.removeItem('wishlist');

  const [headerUpperRight, setHeaderUpperRight] = useState("")
  const [headerUpperRightSaved, setHeaderUpperRightSaved] = useState("")

  const [savedCounter, setSavedCounter] = useState("")
  const [cartCounter, setCartCounter] = useState("")

  const [savedCounterStyle, setSavedCounterStyle] = useState("")
  const [cartCounterStyle, setCartCounterStyle] = useState("")

  useEffect(() => {
    const countersWish = JSON.parse(localStorage.getItem('wishlist')) || []
    const countersCart = JSON.parse(localStorage.getItem('cart')) || []

    if (countersCart.length !== 0) {
      setHeaderUpperRight("header__upper__right__has-counter")
      setHeaderUpperRightSaved("header__upper__right__saved__has-counter")
    }
    else {
      setHeaderUpperRight("")
      setHeaderUpperRightSaved("")
    }

    let savedCounterNumber = countersWish.length
    let cartCounterNumber = countersCart.length

    if (savedCounterNumber > 99) savedCounterNumber = 99
    if (cartCounterNumber > 99) cartCounterNumber = 99

    if (savedCounterNumber !== 0) {
      setSavedCounter(savedCounterNumber)
      setTimeout(() => setSavedCounterStyle("header__upper__right__saved__counter__not-blurred"), 100)
    }
    else setTimeout(() => setSavedCounterStyle(""), 100)

    if (cartCounterNumber !== 0) {
      setCartCounter(cartCounterNumber)
      setTimeout(() => setCartCounterStyle("header__upper__right__saved__counter__not-blurred"), 100)
    }
    else setTimeout(() => setCartCounterStyle(""), 100)
  }, [trigger])

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const handleDropdown = () => setDropdownVisible(!dropdownVisible)

  return (
    <header id="header" className="header">

      <div className="header__upper cont">

        <div className="header__upper__left">
          <div className="header__upper__left__hamburger" onClick={handleDropdown}>
            <button className="header__upper__left__hamburger__nav-toggle">
              <Image src="/images/icons/menu.svg" className="icon-style header__upper__left__hamburger__nav-toggle__icon" width="24" height="24" alt="menu" />
            </button>

            {dropdownVisible && <Dropdown />}

          </div>
          <div className="header__upper__left__logo">
            <Link href="/" className="header__upper__left__logo__link">
              <p className="header__upper__left__logo__bricks">Bricks</p>
            </Link>
          </div>
        </div>

        <div className={`header__upper__right ${headerUpperRight}`}>

          <div className="header__upper__right__search">
            <Link href="/search">
              <Image src="/images/icons/search.svg" className="icon-style--search--header" width="22" height="16" alt="search" />
            </Link>
          </div>

          <div className={`header__upper__right__saved ${headerUpperRightSaved}`}>
            <Link href="/saved" className="header__upper__right__saved--link">
              <Image src="/images/icons/heart.svg" className="icon-style" width="24" height="24" alt="heart" />
              <p className={`header__upper__right__saved__counter ${savedCounterStyle}`}>
                {savedCounter}
              </p>
            </Link>
          </div>

          <div className="header__upper__right__cart">
            <Link href="/cart">
              <Image src="/images/icons/cart.svg" className="icon-style fa-basket-shopping" width="24" height="24" alt="cart" />
              <p className={`header__upper__right__cart__counter ${cartCounterStyle}`}>
                {cartCounter}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header