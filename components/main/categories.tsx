"use client"

import categoriesData from "@/data/categories"
import { useState } from "react"
import Image from "next/image";
import Link from 'next/link'


const Category = ({ i }: { i: number }) => {

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
      className={`categories__box ${categoriesData[i].id} ${contBlurred}`}
    >
        <Link href={categoriesData[i].path}>
          <Image 
            onLoad={handleLoad}
            className={`categories__box__img cat_img${[i]} ${enlarge} ${imgUnloaded}`} 
            src={categoriesData[i].img} alt={`Category ${categoriesData[i]}`} 
            loading="lazy" width="575" height="260"
          />
          <div className="categories__box__title">
              <h2 className="categories__box__title__h2">{categoriesData[i].title}</h2>
          </div>
        </Link>
    </div>
  )
}

const Categories = () => {

  const categories = []

  for (let i = 0; i < categoriesData.length; i++) {
    categories.push(<Category key={i} i={i}/>)
  }

  return (
    <section className="categories cont">
      {categories.map(category => category)}
    </section>
  )
}

export default Categories