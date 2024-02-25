import { FaUser } from "react-icons/fa";
import Link from "next/link";

const AuthButtonRight = ({ dictionary, isLoggedIn }: { dictionary: any, isLoggedIn: boolean }) => {

  let button: JSX.Element = <></>

  if (!isLoggedIn) {
    button = (
      <Link href={"/" + dictionary["Language"] + "/auth/signup"} className="header__upper__left__hamburger__dropdown__access-buttons__button">
        <p>{dictionary["Header"]["dropdown"]["sign_up"]}</p>
        <FaUser />
      </Link>
    )
  }
  else if (isLoggedIn) {
    button = (
      <Link href={"/" + dictionary["Language"] + "/account"} className="header__upper__left__hamburger__dropdown__access-buttons__button">
        <p>{dictionary["Header"]["dropdown"]["account"]}</p>
        <FaUser />
      </Link>
    )
  }

  return button
}

export default AuthButtonRight