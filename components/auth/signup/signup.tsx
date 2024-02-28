"use client"

import { useState, useEffect } from "react"

import { PulseLoader } from "react-spinners"
import * as z from 'zod'
import { SignupSchema } from '@/lib/schemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

type FormFields = z.infer<typeof SignupSchema>

export default function Signup({ dictionary }: { dictionary: any }) {

  const [error, setError] = useState("")
  const [removeMessage, setRemoveMessage] = useState("block")
  const [success, setSuccess] = useState(false)
  const [formSusmitted, setFormSubmitted] = useState(<></>)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(SignupSchema)
  })

  useEffect(() => {
    if (errors.email) {
      handleError(dictionary["Auth"]["login"]["errors"]["else"])
    }
    else if (errors.password?.type === "too_small") {
      handleError(dictionary["Auth"]["signup"]["errors"]["too_small"])
    }
    else if (errors.password) {
      handleError(dictionary["Auth"]["login"]["errors"]["else"])
    }

  }, [errors])

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {

    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        dictionary: dictionary
      })
    })

    response.json().then(data => {

      if (data.message) {
        setFormSubmitted(
          <main className="auth">
            <h1 className="section__title">{dictionary["Auth"]["signup"]["title"]}</h1>
            {data.message}
          </main>
        )
        setSuccess(true)
      }
      else if (data.error) {
        handleError(data.error)
      }
    })
    reset()
  }

  const handleError = (error: string) => {
    setRemoveMessage("block")
    setError(error)
    setTimeout(() => { setRemoveMessage("none") }, 3000)
  }


  const form = (
    <main className="auth">
      <h1 className="section__title">{dictionary["Auth"]["signup"]["title"]}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth__box__content__form"
      >

        <label htmlFor="email">{dictionary["Auth"]["signup"]["email"]}
          <input
            type="email" id="email"
            className="auth__box__content__form__input" required
            {...register("email")}
          />
        </label>

        <label htmlFor="name">{dictionary["Auth"]["signup"]["password"]}
          <input
            type="password" id="password"
            className="auth__box__content__form__input" required
            {...register("password")}
          />
        </label>

        <button type="submit"
          name="submit" id="submit"
          className="auth__box__content__form__submit"
        >
          {isSubmitting ?
            <PulseLoader color={"white"} aria-label="Loading Spinner" size={10}
            />
            : dictionary["Auth"]["signup"]["button"]}
        </button>

        <p className="auth__box__content__form__error" style={{ display: removeMessage }}>{error}</p>

      </form>
    </main>
  )

  return success ? formSusmitted : form
}