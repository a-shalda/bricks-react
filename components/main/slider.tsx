"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from 'next/link'
import { type SlideProps, type SliderProps, LowerButtonsProps, LowerButtonProp } from "@/lib/types"

const Slider = ({ dictionary }: { dictionary: any}) => {

  const [current, setCurrent] = useState(0)

  let slides: React.JSX.Element[] = []

  dictionary["Main"]["slider"].forEach((item: SliderProps, index: number) => {
    slides.push(<Slide key={item.id} item={item} index={index} current={current} />);
  })

  const changeIndex = (e: number) => {
    if (e + current > slides.length - 1) setCurrent(0)
    else if (current + e < 0) setCurrent(slides.length - 1)
    else setCurrent(current + e)
  }

  const changeIndexDot = (index: number) => setCurrent(index)

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
      <LowerButtons handlePointerDown={changeIndexDot} current={current} dictionary={dictionary} />
    </section>
  )
}

const Slide = ({ item, index, current }: SlideProps) => {

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
      <Image
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
          <Link href={item.path}><button className="slideshow__slide__abs__box__cont__button">{item.linkText}</button></Link>
        </div>
      </div>
    </div>
  )
}

const LowerButtons = ({ handlePointerDown, current, dictionary }: LowerButtonsProps) => {

  let lowerButtons: React.JSX.Element[] = []

  dictionary["Main"]["slider"].forEach((item: SliderProps, index: number) => {
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

const LowerButton = ({ index, handlePointerDown, current }: LowerButtonProp) => {

  let activeButton = ""
  if (index === current) activeButton = "active--button"
  return <span className={`slideshow__dots__cont__dot ${activeButton}`} onClick={() => handlePointerDown(index)}></span>
}

export default Slider