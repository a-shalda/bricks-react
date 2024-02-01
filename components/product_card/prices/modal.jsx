import Link from 'next/link'

const Modal = ({ modal, handleContinue, toCartMessage }) => {

  const removeStopScroll = () => document.body.classList.remove("stop-scroll")


  return (
    <div className={`modal__cart ${modal}`}>
      <div className="modal__cart__box">
        <div className="modal__cart__box__content">
          <span
            className="modal__cart__box__content__close"
            onPointerDown={handleContinue}
          >
            &times;</span>
          <p className="modal__cart__box__content__message">
            <span className="modal__cart__box__content__message--title">Added to Cart:</span>
            <br></br>
            {toCartMessage}
          </p>
          <Link
            href="/cart"
            className="modal__cart__box__content__cart"
            onPointerDown={removeStopScroll}
          >
            Go to cart</Link>
          <button
            onPointerDown={handleContinue}
            className="modal__cart__box__content__continue"
          >Continue shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal