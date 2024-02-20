import LoginButton from "@/components/general/header/login-button"
import SignupButton from "@/components/general/header/signup-button"


const AccessButtons = ({ dictionary }: { dictionary: any }) => {
  return (
    <div className="header__upper__left__hamburger__dropdown__access-buttons">
      <LoginButton dictionary={dictionary} />
      <SignupButton dictionary={dictionary} />
    </div>
  )
}

export default AccessButtons