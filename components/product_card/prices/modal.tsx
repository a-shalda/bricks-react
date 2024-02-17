import Link from 'next/link'
import { type ModalProps } from "@/lib/types"

const Modal = ({ modal, handleContinue, toCartMessage, dictionary }: ModalProps) => {

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
            <span className="modal__cart__box__content__message--title">{dictionary["Product_Card"]["added_to_cart"]}:</span>
            <br></br>
            {toCartMessage}
          </p>
          <Link
            href="/cart"
            className="modal__cart__box__content__cart"
            onClick={removeStopScroll}
          >
            {dictionary["Product_Card"]["go_to_cart"]}</Link>
          <button
            onClick={handleContinue}
            className="modal__cart__box__content__continue"
          >{dictionary["Product_Card"]["continue_shopping"]}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal