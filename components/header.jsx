"use client"

import "@/scss/styles.scss";

import { useState } from "react";

const Header = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false)


  const Dropdown = () => {

    return (
      <div className="header__upper__left__hamburger__dropdown">
      <div className="header__upper__left__hamburger__dropdown__content">
        <ul className="header__upper__left__hamburger__dropdown__ul">
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/catalog.html">All products</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/brick_slips.html">Klinker brick slips</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/bricks.html">Klinker bricks</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/thermopanels.html">Brick slip thermo panels</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/fence_caps.html">Ceramic fence caps</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/clay_pavers.html">Clay pavers</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/window_sills.html">Ceramic window sills</a></li>
          <li className="header__upper__left__hamburger__dropdown__content__link"><a className="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/mortars.html">Mortars</a></li>
        </ul>
      </div>
    </div>
    )
  }

  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  return (
    <header id="header" className="header">
      <div className="header__upper cont">

        <div className="header__upper__left">
          <div className="header__upper__left__hamburger" onClick={handleDropdown}>
            <button className="header__upper__left__hamburger__nav-toggle">
              <img src="/images/icons/menu.svg" className="icon-style header__upper__left__hamburger__nav-toggle__icon" width="24" height="24" alt="menu"/>
            </button>

            {dropdownVisible && <Dropdown />}

          </div>
          <div className="header__upper__left__logo">
            <a href="/" className="header__upper__left__logo__link">
              <p className="header__upper__left__logo__bricks">Bricks</p>
            </a>
          </div>
        </div>

        <div className="header__upper__right">

          <div className="header__upper__right__search">
            <a href="/search">
              <img src="/images/icons/search.svg" className="icon-style--search--header" width="22" height="16" alt="search"/>
            </a>
          </div>

          <div className="header__upper__right__saved">
            <a href="/saved" className="header__upper__right__saved--link">
              <img src="/images/icons/heart.svg" className="icon-style" width="24" height="24" alt="heart"/>
              <p className="header__upper__right__saved__counter"></p>
            </a>
          </div>

          <div className="header__upper__right__cart">
            <a href="/cart"> 
              <img src="/images/icons/cart.svg" className="icon-style fa-basket-shopping" width="24" height="24" alt="cart"/>
              <p className="header__upper__right__cart__counter"></p>
            </a>
          </div>
          
        </div>

      </div>
    </header>
  )
}

export default Header