"use client"

import Image from "next/image";
import { useState } from "react";


const Thumbnail = ({ image, index, alt }) => {

  const [thumbnailBlurred, setThumbnailBlurred] = useState("thumbnail_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setThumbnailBlurred("")
    setImgUnloaded("")
  }

  let gridNumber

  (index === 0) ? gridNumber = 'one'
    : (index === 1) ? gridNumber = 'two'
      : (index === 2) ? gridNumber = 'three'
        : (index === 3) ? gridNumber = 'four'
          : (index === 4) ? gridNumber = 'five'
            : (index === 5) ? gridNumber = 'six'
              : (index === 6) ? gridNumber = 'seven'
                : (index === 7) ? gridNumber = 'eight'
                  : (index === 8) ? gridNumber = 'nine'
                    : (index === 9) ? gridNumber = 'ten'
                      : (index === 10) ? gridNumber = 'eleven'
                        : (index === 11) ? gridNumber = 'twelve'
                          : (index === 12) ? gridNumber = 'thirteen'
                            : (index === 13) ? gridNumber = 'fourteen'
                              : (index === 14) ? gridNumber = 'fifteen'
                                : (index === 15) ? gridNumber = 'sixteen'
                                  : (index === 16) ? gridNumber = 'seventeen'
                                    : (index === 17) ? gridNumber = 'eighteen'
                                      : (index === 18) ? gridNumber = 'nineteen'
                                        : (index === 19) ? gridNumber = 'twenty'
                                          : (index === 20) ? gridNumber = 'twenty_one' : gridNumber = ""

  return (
    <div className={`main__window__bottom__left__grid__cont active ${gridNumber} ${thumbnailBlurred}`}>
      <Image
        onLoad={handleLoad}
        src={`${image}`}
        className={`main__window__bottom__left__grid__cont__img ${imgUnloaded}`}
        alt={`${alt}`}
        width="500" height="500"
        loading="lazy" />
      {/* onclick="currentImage(${index + 1})" */}
    </div>
  )
}

export const Thumbnails = ({ product }) => {

  let thumbnails = []
  let alt = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  product.image_original.forEach((image, index) => {
    thumbnails.push(<Thumbnail key={index} image={image} index={index} alt={alt} />)
  });

  return thumbnails.map(thumbnail => thumbnail)
}


const ImageComp = ({ image, index, alt, current }) => {

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
        src={`${image}`}
        className={`main__window__top__left__cont__img fade ${mainImage} ${imgUnloaded}`}
        alt={`${alt}`}
        width="1000" height="1000"
        itemProp={`${itemprop}`}
        loading={`${loading}`} />
    </div>
  )
}

export const Gallery = ({ product }) => {

  const [current, setCurrent] = useState(0)

  let images = []
  let alt = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  product.image_original.forEach((image, index) => {
    images.push(<ImageComp key={index} image={image} index={index} alt={alt} current={current}/>)
  });

  const changeIndex = (e) => {
    if (e + current > images.length - 1) setCurrent(0)
    else if (current + e < 0) setCurrent(images.length - 1)
    else setCurrent(current + e)  }

  return (
    <>
      <button onPointerDown={() => changeIndex(-1)} className="main__window__top__left__button--prev">❮</button>
      <button onPointerDown={() => changeIndex(1)} className="main__window__top__left__button--next">❯</button>
      {images.map(img => img)}
    </>
  )
}