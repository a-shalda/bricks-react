"use client"

import sliderItems from "@/data/slider-items"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from 'next/link'


const Slider = () => {

  let slides = []

  const [current, setCurrent] = useState(0)

  sliderItems.forEach((item, index) => {
    slides.push(<Slide key={item.id} item={item} index={index} current={current} />);
  })

  const changeIndex = (e) => {
    if (e + current > slides.length - 1) setCurrent(0)
    else if (current + e < 0) setCurrent(slides.length - 1)
    else setCurrent(current + e)
  }

  const changeIndexDot = (index) => setCurrent(index)

  const sliderInterval = () => changeIndex(1)

  useEffect(() => {
    const interval = setInterval(sliderInterval, 5000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="slideshow cont">
      {slides.map(slide => slide)}
      <button onClick={() => changeIndex(-1)} className="slideshow__button--prev">❮</button>
      <button onClick={() => changeIndex(1)} className="slideshow__button--next">❯</button>
      <LowerButtons handlePointerDown={changeIndexDot} current={current} />
    </section>
  )
}

const Slide = ({ item, index, current }) => {

  let sliderHeight = 640
  let sliderWidth = 640

  let currentIndex = index

  let display = "none"
  if (currentIndex === current) display = "block"

  const [sliderBlurred, setSliderBlurred] = useState("slider_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setSliderBlurred("")
    setImgUnloaded("")
  }

  // if (typeof window !== "undefined") {
  //   if (window.innerWidth <= 906) { sliderHeight = 480; }
  //   else { sliderHeight = 640; }
  // }

  return (
    <div
      className={`slideshow__slide ${sliderBlurred}`}
      style={{ display: display }}
    >
      <Image srcSet={`${item.img_800} 800w, ${item.img} 1200w`} sizes="(max-width: 800px) 800px, 1200px"
        src={item.img}
        alt={item.desc}
        className={`slideshow__slide__img fade ${imgUnloaded}`}
        height={sliderHeight}
        width={sliderWidth}
        priority={true}
        onLoad={handleLoad}
      />
      <div className="slideshow__slide__abs">
        <div className="slideshow__slide__abs__box__cont">
          <p className="slideshow__slide__abs__box__cont__title">{item.title}</p>
          <p className="slideshow__slide__abs__box__cont__desc">{item.desc}</p>
          <Link href={item.path}><button className="slideshow__slide__abs__box__cont__button">Explore</button></Link>
        </div>
      </div>
    </div>
  )
}

const LowerButtons = ({ handlePointerDown, current }) => {

  let lowerButtons = [];

  sliderItems.forEach((item, index) => {
    lowerButtons.push(<LowerButton key={item.id} handlePointerDown={handlePointerDown} index={index} current={current} />)
  })

  return (
    <>
      <div className="slideshow__dots">
        <div className="slideshow__dots__cont">
          {lowerButtons.map(button => button)}
        </div>
      </div>
    </>
  )
}

const LowerButton = ({ index, handlePointerDown, current }) => {

  let activeButton = ""
  if (index === current) activeButton = "active--button"
  return <span className={`slideshow__dots__cont__dot ${activeButton}`} onClick={() => handlePointerDown(index)}></span>
}

export default Slider