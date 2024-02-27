"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PulseLoader } from "react-spinners"

import * as z from 'zod'
import { LoginSchema } from '@/lib/schemas'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

type FormFields = z.infer<typeof LoginSchema>

export default function Login({ dictionary }: { dictionary: any }) {

  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (response) {
      console.log(response)
    }

    if (!response?.error) {
      router.push(`/${dictionary["Language"]}/`)
      router.refresh()
    }
  }

  errors.email && console.log(errors.email)
  errors.password && console.log(errors.password)


  return (
    <main className="auth">
      <h1 className="section__title">{dictionary["Auth"]["login"]["title"]}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth__box__content__form"
      >

        <label htmlFor="email">{dictionary["Auth"]["login"]["email"]}
          <input
            type="email" id="email"
            className="auth__box__content__form__input" required
            {...register("email")}
          />
        </label>


        <label htmlFor="name">{dictionary["Auth"]["login"]["password"]}
          <input
            type="password" id="password"
            className="auth__box__content__form__input" required
            {...register("password")}
          />
        </label>


        <button type="submit"
          name="submit" id="submit"
          className="auth__box__content__form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ?
            <PulseLoader color={"white"} aria-label="Loading Spinner" size={10}
            />
            : dictionary["Auth"]["login"]["button"]}
        </button>
      </form>
    </main>
  )
}