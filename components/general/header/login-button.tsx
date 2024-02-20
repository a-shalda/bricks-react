import { FaArrowRightToBracket } from "react-icons/fa6";


const LoginButton = ({ dictionary }: { dictionary: any }) => {


  return (
    <div className="header__upper__left__hamburger__dropdown__access-buttons__button">
      <p>{dictionary["Header"]["dropdown"]["sign_in"]}</p>
      <FaArrowRightToBracket />
    </div>
  )
}

export default LoginButton