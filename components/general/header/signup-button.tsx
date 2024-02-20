import { FaUser } from "react-icons/fa";

const SignupButton = ({ dictionary }: { dictionary: any }) => {

  return (
    <div className="header__upper__left__hamburger__dropdown__access-buttons__button">
      <p>{dictionary["Header"]["dropdown"]["sign_up"]}</p>
      <FaUser />
    </div>
  )
}

export default SignupButton