"use client"

import { PulseLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

export const NewVerificationForm = ({ dictionary }: { dictionary: any }) => {

  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  async function checkVerificationToken(token: string, dictionary: any) {
    const response = await fetch(`/api/auth/check-verification-token`, {
      method: "POST",
      body: JSON.stringify({
        token: token,
        dictionary: dictionary
      })
    })

    response.json().then(data => {

      if (data.message) {
        console.log(data.message)
        setMessage(data.message)
        setSuccess(true)
      }
      else if (data.error) {
        console.log(data.error)
        setMessage(data.error)
      }
    })
  }

  const onSubmit = useCallback(() => {
    if (token) {
      checkVerificationToken(token, dictionary)
    }
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])


  return (
    <main className="auth">
      {/* <h1 className="section__title">{dictionary["Auth"]["signup"]["title"]}</h1> */}

      {!message && <PulseLoader color={"gray"} aria-label="Loading Spinner" />}

      {message}
      {success && <Link href={`/${dictionary["Language"]}/auth/login`}>{dictionary["Auth"]["confirmation"]["login"]}</Link>}

    </main>
  )
}