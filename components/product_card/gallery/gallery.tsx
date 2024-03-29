"use client"

import Image from "next/image"
import { useState } from "react"
import Thumbnails from "@/components/product_card/gallery/thumbnails"
import { type ProductProps, ImageCompProps } from "@/lib/types"


const ImageComp = ({ image, index, alt, current, handleModal, dictionary }: ImageCompProps) => {

  const [imageBlurred, setImageBlurred] = useState("image_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setImageBlurred("")
    setImgUnloaded("")
  }

  let priority = false
  if (index === 0) priority = true

  let mainBox = "", mainImage = ""

  if (index === current) {
    mainBox = "main_box"
    mainImage = "main_image"
  }

  return (
    <div className={`main__window__top__left__cont ${mainBox} ${imageBlurred}`}>
      <Image
        onLoad={handleLoad}
        onClick={() => handleModal(image)}
        src={image}
        className={`main__window__top__left__cont__img fade ${mainImage} ${imgUnloaded}`}
        alt={alt}
        width="1000" height="1000"
        itemProp="image"
        priority={priority}
        quality={100}
        unoptimized={true}
      />
    </div>
  )
}

const Gallery = ({ product, dictionary }: { product: ProductProps, dictionary: any}) => {

  const [imageModal, setImageModal] = useState(product.image_original[0])
  const [modalVisible, setModalVisible] = useState("")
  const [imgUnloaded, setImgUnloaded] = useState("modal--image--unloaded")

  const handleModal = (imageSource: string) => {
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

  let images: React.JSX.Element[] = []

  let type = product.type_ru
  if (dictionary["Language"] === "en") type = product.type
  let alt = type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  product.image_original.forEach((image: string, index: number) => {
    images.push(<ImageComp key={index} image={image} index={index} alt={alt} current={current} handleModal={handleModal} dictionary={dictionary}/>)
  });

  const changeIndex = (e: number) => {
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
  const changeIndexThumbnail = (index: number) => setCurrent(index)


  return (
    <>
      <div className="main__window__top__left">
        <button onClick={() => changeIndex(-1)} className="main__window__top__left__button--prev">❮</button>
        <button onClick={() => changeIndex(1)} className="main__window__top__left__button--next">❯</button>
        {images.map(img => img)}
      </div>

      <Thumbnails product={product} current={current} changeIndexThumbnail={changeIndexThumbnail} />

      <div className={`modal__image ${modalVisible}`}>
        <button onClick={() => changeIndex(-1)} className="modal__image__button--prev">❮</button>
        <button onClick={() => changeIndex(1)} className="modal__image__button--next">❯</button>
        <div className="modal__image__box">
          <span onClick={closeModal} className="modal__image__box__close">&times;</span>
          {(modalVisible === "modal--visible") ?
            <img
              className={`modal__image__box__content ${imgUnloaded}`}
              onClick={closeModal}
              onLoad={handleLoad}
              src={imageModal}
              alt={product.id}
            /> : null}
        </div>
      </div>
    </>
  )
}

export default Gallery