"use client"

import sliderItems from "@/data/slider-items"
import { useState } from "react"
import Image from "next/image";


const Slider = () => {

  let slides = []

  sliderItems.forEach((item) => {
    slides.push(<Slide key={item.id} item={item} />);
  })

  return (
    <section className="slideshow cont">
      {slides.map(slide => slide)}
      <button className="slideshow__button--prev">❮</button>
      <button className="slideshow__button--next">❯</button>
      <LowerButtons />
    </section>
  )
}

const Slide = ({ item }) => {

  let sliderHeight = 640
  let sliderWidth = 640

  // if (typeof window !== "undefined") {
  //   if (window.innerWidth <= 906) { sliderHeight = 480; }
  //   else { sliderHeight = 640; }
  // }

  return (
    <div className="slideshow__slide">
      <Image srcSet={`${item.img_800} 800w, ${item.img} 1200w`} sizes="(max-width: 800px) 800px, 1200px"
        src={`${item.img}`}
        alt={`${item.desc}`}
        className="slideshow__slide__img fade"
        data-product-id={`${item.id}`}
        height={sliderHeight}
        width={sliderWidth}
      />
      <div className="slideshow__slide__abs">
        <div className="slideshow__slide__abs__box__cont">
          <p className="slideshow__slide__abs__box__cont__title">{item.title}</p>
          <p className="slideshow__slide__abs__box__cont__desc">{item.desc}</p>
          <a href={`${item.path}`}><button className="slideshow__slide__abs__box__cont__button">Explore</button></a>
        </div>
      </div>
    </div>
  )
}


const LowerButtons = () => {

  let lowerButtons = [];

  sliderItems.forEach((item) => {
    lowerButtons.push(<LowerButton key={item.id} id={item.id}/>)
  })

  return (
    <>
      <div className="slideshow__dots"></div>
      <div className="slideshow__dots__cont">
        {lowerButtons.map(button => button)}
      </div>
    </>
  )
}

const LowerButton = ({ id }) => {

  const [currentSlide, setCurrentSlide] = useState("")

  const handlePointerDown = () => {

    
  }


  return <span onPointerDown={handlePointerDown} className="slideshow__dots__cont__dot" data-product-id={`${id}`}></span>
}




// //Adding event listeners
// document.querySelectorAll('.slideshow__dots__cont__dot')

//   .forEach((button) => {
//     button.addEventListener('pointerdown', () => {
//       currentSlide(button.dataset.productId);
//     });
//   });



// let sliderInterval = function () {
//   plusSlides(1);
// }

// //Starting slider once the latest slide has been loaded
// const mainSlider = document.querySelector('.slideshow');

// const allSlides = mainSlider.querySelectorAll('img');

// let start = setInterval(sliderInterval, 3000);

// //Setting and clearing intervals for the slider

// let slideIndex = 1;

// //Code for side buttons
// function plusSlides(n) {
//   // clearInterval(start)
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   clearInterval(start)
//   showSlides(slideIndex = Number(n));
// }


// const prevSlide = document.querySelector('.slideshow__button--prev');
// const nextSlide = document.querySelector('.slideshow__button--next');

// prevSlide.addEventListener('pointerdown', () => {
//   clearInterval(start)
//   plusSlides(-1);
//   prevSlide.classList.add('slideshow__button--active');
//   setTimeout((function () { prevSlide.classList.remove('slideshow__button--active') }), 200)
// });

// nextSlide.addEventListener('pointerdown', () => {
//   clearInterval(start)
//   plusSlides(1);
//   nextSlide.classList.add('slideshow__button--active');
//   setTimeout((function () { nextSlide.classList.remove('slideshow__button--active') }), 200)
// });

// //Code for the slider

// showSlides(slideIndex);

// function showSlides(n) {
//   let slides = document.querySelectorAll(".slideshow__slide");
//   let dots = document.querySelectorAll(".slideshow__dots__cont__dot");

//   if (n > slides.length) { slideIndex = 1 }

//   if (n < 1) { slideIndex = slides.length }

//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }

//   for (let i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active--button", "");
//   }

//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active--button";
// }

export default Slider