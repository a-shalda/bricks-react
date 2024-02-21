import AuthButtonLeft from "@/components/general/header/auth-button-left"
import AuthButtonRight from "@/components/general/header/auth-button-right"


const AccessButtons = ({ dictionary, isLoggedIn }: { dictionary: any, isLoggedIn: boolean }) => {
  return (
    <div className="header__upper__left__hamburger__dropdown__access-buttons">
      <AuthButtonLeft dictionary={dictionary} isLoggedIn={isLoggedIn}/>
      <AuthButtonRight dictionary={dictionary} isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default AccessButtons