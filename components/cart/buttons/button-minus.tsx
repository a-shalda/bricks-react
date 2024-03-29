"use client"

import { useState } from "react"

const ButtonMinus = ({ handleButton }: { handleButton: () => void}) => {

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
      className={`cart__cont__product__quantity__buttons__minus ${buttonTouched}`}
      onClick={handleTouch}
    >-</button>
  )
}

export default ButtonMinus