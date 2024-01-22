import "@/scss/styles.scss";
import categoriesData from "@/data/categories"


const Category = ({ i }) => {

  return (
    <div className={`categories__box ${categoriesData[i].id}`}>
        <a href={`${categoriesData[i].path}`}>
          <img className={`categories__box__img cat_img${[i]}`} src={categoriesData[i].img} alt={`Category ${categoriesData[i].desc}`} loading="lazy" width="575" height="260"></img>
          <div className="categories__box__title">
              <h2 className="categories__box__title__h2">{categoriesData[i].title}</h2>
          </div>
        </a>
    </div>
  )
}

const Categories = () => {

  const categories = []

  const handlePointerMove = () => {

  }

  for (let i = 0; i < categoriesData.length; i++) {
    categories.push(<Category onPointerMove={handlePointerMove} key={i} i={i}/>)
  }

  return (
    <section className="categories cont">
      {categories}
    </section>
  )
}

export default Categories