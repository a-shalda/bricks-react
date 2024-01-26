"use client"

import products from "@/data/products"
import Image from "next/image";
import { useState } from "react"
import calculatePrices from "@/helpers/calculatePrices";
import Link from 'next/link'


const ShowProducts = () => {

  let productsHTML = [];

  products.forEach((product, index) => {
    productsHTML.push(<GenerateProducts key={product.id} product={product} index={index} />);
  });

  return (
    <section className="products cont">
      {productsHTML.map(product => product)}
    </section>
  )
}

const GenerateProducts = ({ product, index }) => {

  if (product.priceType === 1) {

    return <ProductCard
      product={product}
      index={index}
      priceM={calculatePrices(product)[0]}
      pricePc={calculatePrices(product)[1]}
    />
  }
  else if (product.priceType === 2) {

    return <ProductCard
      product={product}
      index={index}
      priceM={calculatePrices(product)[0]}
      pricePc={calculatePrices(product)[1]}
    />
  }
  else if (product.priceType === 3) {

    return <ProductCard
      product={product}
      index={index}
      priceM={calculatePrices(product)[0]}
      pricePc={calculatePrices(product)[1]}
    />
  }

  else if (product.priceType === 4) {

    return <ProductCard
      product={product}
      index={index}
      pricePc={calculatePrices(product)[0]}
    />
  }
}

let timeOut = ''
let timeOutBack = ''

const ProductCard = ({ product, index, priceM, pricePc }) => {

  if (!product) return null
  const indexOfDot = (number) => number.toString().indexOf('.')

  const [contBlurred, setContBlurred] = useState("cont_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setContBlurred("")
    setImgUnloaded("")
  }

  const [opacity, setOpacity] = useState("")
  const [moveLeft, setMoveLeft] = useState("")
  const [moveRight, setMoveRight] = useState("")

  const handlePointerEnter = () => {
    setOpacity("opacity")
    timeOut = setTimeout(() => setMoveLeft("moveLeft"), 1000)
    timeOutBack = setTimeout(() => setMoveRight("moveRight"), 5000);
  }

  const handlePointerLeave = () => {
    setOpacity("")
    setMoveLeft("")
    setMoveRight("")
    clearTimeout(timeOut);
    clearTimeout(timeOutBack);
  }

  let priceType = (
    <>
      &nbsp;m<sup>2</sup>
    </>
  )

  if (product.priceType === 3) {
    priceType = (
      <>
        &nbsp;lm
      </>
    )
  }

  let priceFinalM = <></>

  (product.priceType !== 4) ? priceFinalM = (
    <>
      <sup>€</sup>
      {priceM.slice(0, indexOfDot(priceM))}
      <span className="price-small">
        {priceM.slice(indexOfDot(priceM))}
      </span>
      <span className="price-desc">
        {priceType}
      </span>
    </>
  ) : null

  let priceFinalPc = (
    <>
      <sup>€</sup>
      {pricePc.slice(0, indexOfDot(pricePc))}
      <span className="price-small">
        {pricePc.slice(indexOfDot(pricePc))}
      </span>
      <span className="price-desc">&nbsp;pc</span>
    </>
  )

  return (
    <div
      className="product"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}>

      <div className="product__top">
        <Link href={product.filepath}>
          <div className={`product__top__cont ${contBlurred}`}>
            <Image
              onLoad={handleLoad}
              className={`
                product__top__cont__img product_img_${index} 
                ${imgUnloaded} 
                ${opacity} 
                ${moveLeft} 
                ${moveRight}
              `}
              src={`${product.image_thumbnail[0]}`}
              alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`}
              width="350" height="229"
              loading="lazy"
            />
            <Image
              className={`
                product__top__cont__img product_img_second_${index} 
                ${opacity} 
                ${moveLeft} 
                ${moveRight}
              `}
              src={`${product.image_thumbnail[1]}`}
              alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`}
              width="350" height="229"
              loading="eager"
            />
          </div>
        </Link>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{(product.priceType !== 4) ? priceFinalM : priceFinalPc}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p">{(product.priceType !== 4) ? priceFinalPc : null}</p>
        </div>
      </div>

      <div className="product__bottom">
        <Link href={product.filepath}>
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </Link>
        <div className="product__bottom__desc">
          <p className="product__bottom__desc__p">Manufacturer: {product.specs?.manufacturer}</p>
          <p className="product__bottom__desc__p">Country: {product.specs?.countryOfOrigin}</p>
          <p className="product__bottom__desc__p">Size (mm): {product.specs?.format}</p>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts