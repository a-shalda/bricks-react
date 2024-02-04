import calculateOptions from "@/helpers/calculateOptions"
import { type PricesOptionsProps } from "@/lib/types"


const PricesOptions = ({ product, setQuantity, quantity, errorAdding, setToCartMessage }: PricesOptionsProps) => {

  const options = calculateOptions(product)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.currentTarget.value))
    setToCartMessage((e.currentTarget[Number(e.currentTarget.value)] as HTMLOptionElement).text)
  }

  return (

    <div className="main__window__middle__top__stock">
      <div className="main__window__middle__top__stock__info"></div>
      <div className="main__window__middle__top__stock__subtotal">
        <div className="main__window__middle__top__stock__subtotal__value">
          <label htmlFor="qty" className="main__window__middle__top__stock__subtotal__value--label">select
            quantity</label>
          <select
            onChange={handleSelect}
            value={quantity}
            name="Quantity" id="qty"
            className={`main__window__middle__top__stock__subtotal__value__select ${errorAdding}`}>
            {options && (options as [React.JSX.Element]).map(option => option)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PricesOptions