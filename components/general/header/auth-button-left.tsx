import { FaArrowRightToBracket } from "react-icons/fa6";
import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";
import Link from "next/link";
import { signOut } from "next-auth/react";


const AuthButtonLeft = ({ dictionary, isLoggedIn }: { dictionary: any, isLoggedIn: boolean }) => {

  let button: JSX.Element = <></>

  if (!isLoggedIn) {
    button = (
      <Link href={"/" + dictionary["Language"] + "/auth/login"} className="header__upper__left__hamburger__dropdown__access-buttons__button">
        <p>{dictionary["Header"]["dropdown"]["sign_in"]}</p>
        <FaArrowRightToBracket />
      </Link>
    )
  }
  else if (isLoggedIn) {
    button = (
      <button
        onClick={() => { signOut() }}
        className="header__upper__left__hamburger__dropdown__access-buttons__button"
      >
        <span>{dictionary["Header"]["dropdown"]["logout"]}</span>
        <HiMiniArrowLeftOnRectangle style={{ fontSize: "20px" }} />
      </button>
    )
  }

  return button
}

export default AuthButtonLeft