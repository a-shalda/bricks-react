"use client"

import products from "@/data/products"
import Image from "next/image";
import { useState } from "react"


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

  let priceCentsM2 = product.priceCentsM2;
  let priceCentsPc = product.priceCentsPc;
  let supplierPriceType = product.supplierPriceType;
  const piecesInSquareMeter = Number(product.specs?.piecesInSquareMeterCm / 100);
  const piecesInLinearMeter = Number(product.specs?.piecesInLinearMeterCm / 100);
  const isM2 = product.isM2;
  const isLinearMeter = product.isLinearMeter;

  if (isM2 === true && supplierPriceType === 'm2' && supplierPriceType !== 'pc') {

    const priceM = ((priceCentsM2 / 100).toFixed(2));
    const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);

    return <ProductCard
      product={product}
      index={index}
      priceM={priceM}
      pricePc={pricePc}
      type={"one"}
    />
  }
  else if (product.supplierPriceType === 'pc') {

    if (isM2 === true && isLinearMeter === false) {

      const priceM = (Math.ceil((priceCentsPc * piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
      const pricePc = (priceCentsPc / 100).toFixed(2).toString();

      return <ProductCard
        product={product}
        index={index}
        priceM={priceM}
        pricePc={pricePc}
        type={"two"}
      />
    }
    else if (isM2 === false && isLinearMeter === true) {

      const priceM = (Math.ceil((priceCentsPc * piecesInLinearMeter).toFixed(4)) / 100).toFixed(2).toString();
      const pricePc = (priceCentsPc / 100).toFixed(2).toString();

      return <ProductCard
        product={product}
        index={index}
        priceM={priceM}
        pricePc={pricePc}
        type={"three"}
      />
    }

    else if (isM2 === false && isLinearMeter === false) {

      const pricePc = (priceCentsPc / 100).toFixed(2).toString();

      return <ProductCard
        product={product}
        index={index}
        pricePc={pricePc}
        type={"four"}
      />
    }
  }
}

let timeOut = ''
let timeOutBack = ''

const ProductCard = ({ product, index, priceM, pricePc, type }) => {

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

  if (type === "three") {
    priceType = (
      <>
        &nbsp;lm
      </>
    )
  }

  let priceFinalM = <></>

  (type !== "four") ? priceFinalM = (
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
        <a href={`${product.filepath}`}>
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
        </a>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{(type !== "four") ? priceFinalM : priceFinalPc}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p">{(type !== "four") ? priceFinalPc : null}</p>
        </div>
      </div>

      <div className="product__bottom">
        <a href={`${product.filepath}`}>
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </a>
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