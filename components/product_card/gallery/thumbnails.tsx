"use client"

import Image from "next/image"
import { useState } from "react"
import { type ThumbnailProps, ThumbnailsProps } from "@/lib/types"


const Thumbnail = ({ image, index, alt, current, changeIndexThumbnail }: ThumbnailProps) => {

  const [thumbnailBlurred, setThumbnailBlurred] = useState("thumbnail_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setThumbnailBlurred("")
    setImgUnloaded("")
  }

  let gridNumber: string

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

  let mainThumbnail = "", activeThumbnail = ""

  if (index === current) {
    mainThumbnail = "main_thumbnail clear"
    activeThumbnail = "active"
  }

  return (
    <div className={`main__window__bottom__left__grid__cont ${activeThumbnail} ${gridNumber} ${thumbnailBlurred}`}>
      <Image
        onLoad={handleLoad}
        src={image}
        className={`main__window__bottom__left__grid__cont__img ${imgUnloaded} ${mainThumbnail}`}
        alt={alt}
        width="500" height="500"
        loading="lazy"
        onClick={() => changeIndexThumbnail(index)}
        unoptimized={true}
      />
    </div>
  )
}

const Thumbnails = ({ product, current, changeIndexThumbnail }: ThumbnailsProps ) => {

  let thumbnails: React.JSX.Element[] = []
  let alt = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format

  product.image_original.forEach((image: string, index: number) => {
    thumbnails.push(<Thumbnail key={index} image={image} index={index} alt={alt} current={current} changeIndexThumbnail={changeIndexThumbnail} />)
  });

  return (
    <div className="main__window__bottom__left">
      <div className="main__window__bottom__left__grid">
        {thumbnails.map(thumbnail => thumbnail)}
      </div>
    </div>
  )
}

export default Thumbnails