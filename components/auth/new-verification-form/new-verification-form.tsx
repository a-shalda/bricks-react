"use client"
import { PulseLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

export const NewVerificationForm = ({ dictionary }: { dictionary: any }) => {
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

    // response.json().then(data => {

    //   if (data.message) {
    //     console.log(data.message)
    //   }
    //   else if (data.error) {
    //     console.log(data.error)
    //   }
    // })
  }

  //check if token expired

  if (token) {
    const verifiedEmail = checkVerificationToken(token, dictionary)
  }


  return (<>
  
  
  </>)
}