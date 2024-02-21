"use client"

import { useState } from "react"

export default function Signup({ dictionary }: { dictionary: any }) {

  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formEmail, setFormEmail] = useState("")

  const handleFormName = (e: React.ChangeEvent<HTMLInputElement>) => setFormName(e.target.value)
  const handleFormPhone = (e: React.ChangeEvent<HTMLInputElement>) => setFormPhone(e.target.value)
  const handleFormEmail = (e: React.ChangeEvent<HTMLInputElement>) => setFormEmail(e.target.value)

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        dictionary: dictionary
      })
    })

    response.json().then(data => {

      if (data.message) {
        console.log(data.message)
      }
      else if (data.status) {
        console.log(data.status)
      }
    })
  }

  return (
    <main className="auth">
      <h1 className="section__title">{dictionary["Auth"]["signup"]["title"]}</h1>
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

        <label htmlFor="email">{dictionary["Auth"]["signup"]["email"]}
          <input
            // onChange={(e) => handleFormEmail(e)}
            // value={formEmail}
            type="email" name="email" id="email"
            className="auth__box__content__form__input" required />
        </label>

        <label htmlFor="name">{dictionary["Auth"]["signup"]["password"]}
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
          value={dictionary["Auth"]["signup"]["button"]}
          name="submit" id="submit"
          className="auth__box__content__form__submit" />
      </form>
    </main>
  )
}