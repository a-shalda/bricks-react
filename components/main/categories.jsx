"use client"

import "@/scss/styles.scss";
import categoriesData from "@/data/categories"
import { useState } from "react"


const Category = ({ i }) => {

  const [enlarge, setEnlarge] = useState("")

  const handleMouseEnter = () => setEnlarge("enlarge")
  const handleMouseLeave = () => setEnlarge("")

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`categories__box ${categoriesData[i].id}`}>
        <a href={`${categoriesData[i].path}`}>
          <img className={`categories__box__img cat_img${[i]} ${enlarge}`} src={categoriesData[i].img} alt={`Category ${categoriesData[i].desc}`} loading="lazy" width="575" height="260"></img>
          <div className="categories__box__title">
              <h2 className="categories__box__title__h2">{categoriesData[i].title}</h2>
          </div>
        </a>
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
      {categories}
    </section>
  )
}

export default Categories