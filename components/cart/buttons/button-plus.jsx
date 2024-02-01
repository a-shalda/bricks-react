"use client"

import { useState } from "react"

const ButtonPlus = ({ handleButton }) => {

  const [buttonTouched, setButtonTouched] = useState("")

  const handleTouch = () => {

    setButtonTouched("cart__cont__product__quantity__buttons__active")
    handleButton()

    setTimeout(() => {
      setButtonTouched("")
    }, 200)
  }

  return (
    <button
      className={`cart__cont__product__quantity__buttons__plus ${buttonTouched}`}
      onPointerDown={handleTouch}
    >+</button>
  )
}

export default ButtonPlus