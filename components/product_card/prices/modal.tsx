import Link from 'next/link'
import { type ModalProps } from "@/lib/types"

const Modal = ({ modal, handleContinue, toCartMessage }: ModalProps) => {

  const removeStopScroll = () => document.body.classList.remove("stop-scroll")

  return (
    <div className={`modal__cart ${modal}`}>
      <div className="modal__cart__box">
        <div className="modal__cart__box__content">
          <span
            className="modal__cart__box__content__close"
            onClick={handleContinue}
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
            onClick={removeStopScroll}
          >
            Go to cart</Link>
          <button
            onClick={handleContinue}
            className="modal__cart__box__content__continue"
          >Continue shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal