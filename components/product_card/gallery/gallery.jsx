"use client"

import Image from "next/image";
import { useState } from "react";
import Thumbnails from "@/components/product_card/gallery/thumbnails";


const ImageComp = ({ image, index, alt, current, handleModal }) => {

  const [imageBlurred, setImageBlurred] = useState("image_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setImageBlurred("")
    setImgUnloaded("")
  }

  let itemprop = "", loading = "eager"

  if (index === 0) {
    itemprop = "image"
    loading = "lazy"
  }

  let mainBox = "", mainImage = ""

  if (index === current) {
    mainBox = "main_box"
    mainImage = "main_image"
  }

  return (
    <div className={`main__window__top__left__cont ${mainBox} ${imageBlurred}`}>
      <Image
        onLoad={handleLoad}
        onPointerDown={() => handleModal(image)}
        src={image}
        className={`main__window__top__left__cont__img fade ${mainImage} ${imgUnloaded}`}
        alt={alt}
        width="1000" height="1000"
        itemProp={itemprop}
        loading={loading} />
    </div>
  )
}

const Gallery = ({ product }) => {

  const [imageModal, setImageModal] = useState(product.image_original[0])
  const [modalVisible, setModalVisible] = useState("")
  const [imgUnloaded, setImgUnloaded] = useState("modal--image--unloaded")

  const handleModal = (imageSource) => {
    setImageModal(imageSource)
    setModalVisible("modal--visible")
    document.body.classList.add('stop-scroll')
  }

  const closeModal = () => {
    setImageModal("")
    setModalVisible("")
    setImgUnloaded("modal--image--unloaded")
    document.body.classList.remove('stop-scroll')
  }

  const handleLoad = () => setImgUnloaded("")

  const [current, setCurrent] = useState(0)

  let images = []
  let alt = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  product.image_original.forEach((image, index) => {
    images.push(<ImageComp key={index} image={image} index={index} alt={alt} current={current} handleModal={handleModal} />)
  });

  const changeIndex = (e) => {
    if (e + current > images.length - 1) {
      setCurrent(0)
      setImageModal(product.image_original[0])
    }
    else if (current + e < 0) {
      setCurrent(images.length - 1)
      setImageModal(product.image_original[images.length - 1])
    }
    else {
      setCurrent(current + e)
      setImageModal(product.image_original[current + e])
    }
  }
  const changeIndexThumbnail = (index) => setCurrent(index)


  return (
    <>
      <div className="main__window__top__left">
        <button onPointerDown={() => changeIndex(-1)} className="main__window__top__left__button--prev">❮</button>
        <button onPointerDown={() => changeIndex(1)} className="main__window__top__left__button--next">❯</button>
        {images.map(img => img)}
      </div>

      <div className="main__window__bottom__left">
        <div className="main__window__bottom__left__grid">
          <Thumbnails product={product} current={current} changeIndexThumbnail={changeIndexThumbnail} />
        </div>
      </div>

      <div className={`modal__image ${modalVisible}`}>
        <button onPointerDown={() => changeIndex(-1)} className="main__window__top__left__button--prev">❮</button>
        <button onPointerDown={() => changeIndex(1)} className="main__window__top__left__button--next">❯</button>
        <div className="modal__image__box">
          <span onPointerDown={closeModal} className="modal__image__box__close">&times;</span>
          {(modalVisible === "modal--visible") ?
            <Image
              className={`modal__image__box__content ${imgUnloaded}`}
              onPointerDown={closeModal}
              onLoad={handleLoad}
              src={imageModal}
              alt={product.id}
              fill={true}
              priority={true}
            /> : null}
        </div>
      </div>
    </>
  )
}

export default Gallery