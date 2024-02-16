"use client"

import { useState } from "react"
import Image from "next/image";
import Link from 'next/link'

const Category = ({ i, categoriesData }: { i: number, categoriesData: any }) => {

  const [enlarge, setEnlarge] = useState("")
  const [contBlurred, setContBlurred] = useState("cont_blurred")
  const [imgUnloaded, setImgUnloaded] = useState("img_unloaded")

  const handleLoad = () => {
    setContBlurred("")
    setImgUnloaded("")
  }
  const handlePointerEnter = () => setEnlarge("enlarge")
  const handlePointerLeave = () => setEnlarge("")

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`categories__box ${categoriesData["Main"]["categories"][i].id} ${contBlurred}`}
    >
      <Link href={categoriesData["Main"]["categories"][i].path}>
        <Image
          onLoad={handleLoad}
          className={`categories__box__img cat_img${[i]} ${enlarge} ${imgUnloaded}`}
          src={categoriesData["Main"]["categories"][i].img} alt={`Category ${categoriesData["Main"]["categories"][i]}`}
          loading="lazy" width="575" height="260"
        />
        <div className="categories__box__title">
          <h2 className="categories__box__title__h2">{categoriesData["Main"]["categories"][i].title}</h2>
        </div>
      </Link>
    </div>
  )
}

const Categories = ({ dictionary }: { dictionary: any}) => {

  const categories = []

  for (let i = 0; i < dictionary["Main"]["categories"].length; i++) {
    categories.push(<Category key={i} i={i} categoriesData={dictionary} />)
  }

  return (
    <section className="categories cont">
      {categories.map(category => category)}
    </section>
  )
}

export default Categories