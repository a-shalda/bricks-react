"use client"

import products from "@/data/products"
import Image from "next/image";


let indicesOfProducts = [];

const ShowCategoryProducts = () => {

  let productsHTML = [];

  products.forEach((product, index) => {
    productsHTML.push(<ShowProducts key={product.id} product={product} index={index} />);
  });

  return (
    <section className="products cont">
      {productsHTML.map(product => product)}
    </section>
  )

  // addPulsingImageAnimation();
  // addOnMouseImageAnimation(indicesOfProducts);
}

const ShowProducts = ({ product, index }) => {

  indicesOfProducts.push(index);

  let priceCentsM2 = product.priceCentsM2;
  let priceCentsPc = product.priceCentsPc;
  let supplierPriceType = product.supplierPriceType;
  const piecesInSquareMeter = Number(product.specs?.piecesInSquareMeterCm / 100);
  const piecesInLinearMeter = Number(product.specs?.piecesInLinearMeterCm / 100);
  const isM2 = product.isM2;
  const isLinearMeter = product.isLinearMeter;

  if (isM2 === true && supplierPriceType === 'm2' && supplierPriceType !== 'pc') {

    return <TypeOne
      product={product}
      index={index}
      priceCentsM2={priceCentsM2}
      piecesInSquareMeter={piecesInSquareMeter}
    />
  }
  else if (product.supplierPriceType === 'pc') {

    if (isM2 === true && isLinearMeter === false) {

      return <TypeTwo
        product={product}
        index={index}
        priceCentsPc={priceCentsPc}
        piecesInSquareMeter={piecesInSquareMeter}
      />
    }
    else if (isM2 === false && isLinearMeter === true) {

      return <TypeThree
        product={product}
        index={index}
        priceCentsPc={priceCentsPc}
        piecesInLinearMeter={piecesInLinearMeter}
      />
    }

    else if (isM2 === false && isLinearMeter === false) {

      return <TypeFour
        product={product}
        index={index}
        priceCentsPc={priceCentsPc}
      />
    }
  }
}

let timeOut = ''
let timeOutBack = ''

// function addOnMouseImageAnimation(indicesOfProducts) {

//   document.querySelectorAll('.product')

//     .forEach((product, index) => {

//       const first = product.querySelector('.product_img_' + indicesOfProducts[index]);
//       const second = product.querySelector('.product_img_second_' + indicesOfProducts[index]);

//       second.addEventListener('load', () => {

//         function moveLeft() {
//           first.classList.add('moveLeft');
//           second.classList.add('moveLeft');
//         }

//         function moveRight() {
//           first.classList.add('moveRight');
//           second.classList.add('moveRight');
//         }

//         product.addEventListener('mouseenter', () => {

//           first.classList.add('opacity');
//           second.classList.add('opacity');
//           timeOut = setTimeout(moveLeft, 1000);
//           timeOutBack = setTimeout(moveRight, 5000);

//           product.addEventListener('mouseleave', () => {

//             clearTimeout(timeOut);
//             clearTimeout(timeOutBack);
//             moveRight();

//             first.classList.remove('opacity', 'moveLeft', 'moveRight');
//             second.classList.remove('opacity', 'moveLeft', 'moveRight');
//           });
//         })
//       });
//     });
// }

// function addPulsingImageAnimation() {

//   document.querySelectorAll('.product__top__cont').forEach((cont) => {
//     cont.classList.add('cont_blurred');

//     const image = cont.querySelector('img');

//     image.classList.add('img_unloaded');

//     image.addEventListener('load', () => {
//       image.classList.remove('img_unloaded');
//       cont.classList.remove('cont_blurred');
//     })
//   })

// }


const TypeOne = ({ product, index, priceCentsM2, piecesInSquareMeter }) => {

  const priceM2 = ((priceCentsM2 / 100).toFixed(2));
  const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
  const indexOfDotM2 = priceM2.toString().indexOf('.');
  const indexofDotPc = pricePc.toString().indexOf('.');

  let priceM2HTML = (
    <>
      <sup>€</sup>{priceM2.slice(0, indexOfDotM2)}<span className="price-small">{priceM2.slice(indexOfDotM2)}</span> <span className="price-desc">m<sup>2</sup></span>
    </>
  )

  let pricePcHTML = (
    <>
      <sup>€</sup>{pricePc.slice(0, indexofDotPc)}<span className="price-small">{pricePc.slice(indexofDotPc)}</span> <span className="price-desc">pc</span>
    </>
  )

  return (

    <div className="product">

      <div className="product__top">
        <a href={`${product.filepath}`}>
          <div className="product__top__cont">
            <Image className={`product__top__cont__img product_img_${index}`} src={`${product.image_thumbnail[0]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" loading="lazy" />
            <Image className={`product__top__cont__img product_img_second_${index}`} src={`${product.image_thumbnail[1]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" />
          </div>
        </a>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{priceM2HTML}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p">{pricePcHTML}</p>
        </div>
      </div>

      <div className="product__bottom">
        <a href={`${product.filepath}`}>
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </a>
        <div className="product__bottom__desc">
          <p className="product__bottom__desc__p">Manufacturer: {product.specs?.manufacturer}</p>
          <p className="product__bottom__desc__p">Country: {product.specs?.countryOfOrigin}</p>
          <p className="product__bottom__desc__p">Size (mm): {product.specs?.format}</p>
        </div>
      </div>
    </div>
  )
}

const TypeTwo = ({ product, index, priceCentsPc, piecesInSquareMeter }) => {

  const priceM2 = (Math.ceil((priceCentsPc * piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
  const pricePc = (priceCentsPc / 100).toFixed(2).toString();
  const indexOfDotM2 = priceM2.toString().indexOf('.');
  const indexofDotPc = pricePc.toString().indexOf('.');

  let priceM2HTML = (
    <>
      <sup>€</sup>{priceM2.slice(0, indexOfDotM2)}<span className="price-small">{priceM2.slice(indexOfDotM2)}</span> <span className="price-desc">m<sup>2</sup></span>
    </>

  )
  let pricePcHTML = (
    <>
      <sup>€</sup>{pricePc.slice(0, indexofDotPc)}<span className="price-small">{pricePc.slice(indexofDotPc)}</span> <span className="price-desc">pc</span>
    </>
  )

  return (
    <div className="product">
      <div className="product__top">

        <a href={`${product.filepath}`}>
          <div className="product__top__cont">
            <Image className={`product__top__cont__img product_img_${index}`} src={`${product.image_thumbnail[0]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" loading="lazy" />
            <Image className={`product__top__cont__img product_img_second_${index}`} src={`${product.image_thumbnail[1]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" />
          </div>
        </a>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{priceM2HTML}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p">{pricePcHTML}</p>
        </div>
      </div>

      <div className="product__bottom">
        <a href="${product.filepath}">
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </a>
        <div className="product__bottom__desc">
          <p className="product__bottom__desc__p">Manufacturer: {product.specs?.manufacturer}</p>
          <p className="product__bottom__desc__p">Country: {product.specs?.countryOfOrigin}</p>
          <p className="product__bottom__desc__p">Size (mm): {product.specs?.format}</p>
        </div>
      </div>
    </div>
  )
}

const TypeThree = ({ product, index, priceCentsPc, piecesInLinearMeter }) => {

  const priceLM = (Math.ceil((priceCentsPc * piecesInLinearMeter).toFixed(4)) / 100).toFixed(2).toString();
  const pricePc = (priceCentsPc / 100).toFixed(2).toString();
  const indexOfDotLM = priceLM.toString().indexOf('.');
  const indexofDotPc = pricePc.toString().indexOf('.');

  let priceLMHTML = (
    <>
      <sup>€</sup>{priceLM.slice(0, indexOfDotLM)}<span className="price-small">{priceLM.slice(indexOfDotLM)}</span> <span className="price-desc">lm</span>
    </>
  )
  let pricePcHTML = (
    <>
      <sup>€</sup>{pricePc.slice(0, indexofDotPc)}<span className="price-small">{pricePc.slice(indexofDotPc)}</span> <span className="price-desc">pc</span>
    </>
  )

  return (
    <div className="product">
      <div className="product__top">

        <a href={`${product.filepath}`}>
          <div className="product__top__cont">
            <Image className={`product__top__cont__img product_img_${index}`} src={`${product.image_thumbnail[0]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" loading="lazy" />
            <Image className={`product__top__cont__img product_img_second_${index}`} src={`${product.image_thumbnail[1]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" />
          </div>
        </a>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{priceLMHTML}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p">{pricePcHTML}</p>
        </div>
      </div>

      <div className="product__bottom">
        <a href={`${product.filepath}`}>
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </a>
        <div className="product__bottom__desc">
          <p className="product__bottom__desc__p">Manufacturer: {product.specs?.manufacturer}</p>
          <p className="product__bottom__desc__p">Country: {product.specs?.countryOfOrigin}</p>
          <p className="product__bottom__desc__p">Size (mm): {product.specs?.format}</p>
        </div>
      </div>
    </div>
  )
}

const TypeFour = ({ product, index, priceCentsPc }) => {
  const pricePc = (priceCentsPc / 100).toFixed(2).toString();
  const indexofDotPc = pricePc.toString().indexOf('.');

  let pricePcHTML = (
    <>
      <sup>€</sup>{pricePc.slice(0, indexofDotPc)}<span className="price-small">{pricePc.slice(indexofDotPc)}</span> <span className="price-desc">pc</span>
    </>
  )

  return (
    <div className="product">
      <div className="product__top">

        <a href={`${product.filepath}`}>
          <div className="product__top__cont">
            <Image className={`product__top__cont__img product_img_${index}`} src={`${product.image_thumbnail[0]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" loading="lazy" />
            <Image className={`product__top__cont__img product_img_second_${index}`} src={`${product.image_thumbnail[1]}`} alt={`${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}`} width="350" height="229" />
          </div>
        </a>

        <div className="product__top__cont__stock">
          <Image src="/images/icons/check.svg" alt="checkmark" className="stock" width="16" height="16" />
          <p className="product__top__cont__stock__desc">{product.availability}</p>
        </div>
      </div>

      <div className="product__middle">
        <div className="product__middle__price--m2">
          <p className="product__middle__price--m2__p">{pricePcHTML}</p>
        </div>
        <div className="product__middle__price--st">
          <p className="product__middle__price--st__p"></p>
        </div>
      </div>

      <div className="product__bottom">
        <a href="${product.filepath}">
          <p className="product__bottom__title">{product.type + ' ' + product.name}</p>
        </a>
        <div className="product__bottom__desc">
          <p className="product__bottom__desc__p">Manufacturer: {product.specs?.manufacturer}</p>
          <p className="product__bottom__desc__p">Country: {product.specs?.countryOfOrigin}</p>
          <p className="product__bottom__desc__p">Size (mm): {product.specs?.format}</p>
        </div>
      </div>
    </div>
  )
}

export default ShowCategoryProducts