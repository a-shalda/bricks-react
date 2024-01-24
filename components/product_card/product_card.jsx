import products from "@/data/products"
import Gallery from "@/components/product_card/gallery/gallery"

const ProductComponent = ({ productId }) => {

  if (!productId) return null

  let product

  products.filter(item => {
    if (item.id === productId) product = item
  })

  if (!product) return null

  const productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;


  return (
    <main itemScope itemType="https://schema.org/Product">
      <section className="main cont">

        <div className="main__cont">
          <h1 className="main__cont__title" itemProp="name">
            {productTitle}
          </h1>
        </div>

        <div className="main__window">
          <Gallery product={product} />

          <div className="main__window__middle__top">
            <div className="main__window__middle__top__price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            </div>

            <div className="main__window__middle__top__stock">
              <div className="main__window__middle__top__stock__info"></div>
              <div className="main__window__middle__top__stock__subtotal">
                <div className="main__window__middle__top__stock__subtotal__value">
                  <label htmlFor="qty" className="main__window__middle__top__stock__subtotal__value--label">select
                    quantity</label>
                  <select name="Quantity" id="qty"
                    className="main__window__middle__top__stock__subtotal__value__select"></select>
                </div>
              </div>
            </div>

            <div className="main__window__middle__top__buy">
              <button className="main__window__middle__top__buy__button_wish">
                <img src="/images/icons/heart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
                  width="18" height="18" alt="heart" />
                <span className="main__window__middle__top__buy__button_wish__text">Save</span>
              </button>

              <button className="main__window__middle__top__buy__button_add">
                <img src="/images/icons/cart.svg" className="main__window__middle__top__buy__button_wish__cont__heart"
                  width="18" height="18" alt="heart" />
                <span className="main__window__middle__top__buy__button_wish__text">Add</span>
              </button>
            </div>
          </div>

          <div className="main__window__middle__bottom"></div>
          <div className="main__window__right__top"></div>
          <div className="main__window__right__bottom"></div>

        </div>



        <div className="modal__cart">
          <div className="modal__cart__box">
            <div className="modal__cart__box__content">

              <span className="modal__cart__box__content__close">&times;</span>
              <p className="modal__cart__box__content__message"></p>
              <a href="/cart.html" className="modal__cart__box__content__cart">Go to cart</a>
              <button className="modal__cart__box__content__continue">Continue shopping</button>

            </div>
          </div>
        </div>

      </section>

      <section className="additional cont"></section>
      <div className="divider--background">
        <div className="divider cont">
          <p className="divider__desc">Similar products</p>
        </div>
      </div>

      <section className="similar products cont"></section>

    </main>
  )
}

export default ProductComponent