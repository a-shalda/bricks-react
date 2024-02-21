"use client"

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login({ dictionary }: { dictionary: any }) {

  const router = useRouter()

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    // const response = await fetch(`/api/auth/signup`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //   })
    // })

    const response = await signIn('credentials', {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    })

    // console.log({ response })

    if(!response?.error) {
      router.push(`/${dictionary["Language"]}/account`)
      router.refresh()
    }


  }

  return (
    <main className="auth">
      <h1 className="section__title">{dictionary["Auth"]["login"]["title"]}</h1>
      <form
        onSubmit={e => handleForm(e)}
        className="auth__box__content__form"
      >
        {/* <label htmlFor="name">{dictionary["Cart"]["modal"]["name"]}
          <input
            // onChange={(e) => handleFormName(e)}
            // value={formName}
            type="text" name="name" id="name"
            className="auth__box__content__form__input" required
          />
        </label> */}

        <label htmlFor="email">{dictionary["Auth"]["login"]["email"]}
          <input
            // onChange={(e) => handleFormEmail(e)}
            // value={formEmail}
            type="email" name="email" id="email"
            className="auth__box__content__form__input" required />
        </label>

        <label htmlFor="name">{dictionary["Auth"]["login"]["password"]}
          <input
            // onChange={(e) => handleFormName(e)}
            // value={formName}
            type="password" name="password" id="password"
            className="auth__box__content__form__input" required
          />
        </label>
        {/* <label htmlFor="phone">{dictionary["Cart"]["modal"]["phone"]}
          <input
            onChange={(e) => handleFormPhone(e)}
            // value={formPhone}
            type="tel" name="phone" id="phone"
            className="auth__box__content__form__input" required />
        </label> */}


        <input type="submit"
          value={dictionary["Auth"]["login"]["button"]}
          name="submit" id="submit"
          className="auth__box__content__form__submit" />
      </form>
    </main>
  )
}