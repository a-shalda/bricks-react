"use client"
import { PulseLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const NewVerificationForm = (dictionary: any) => {
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  async function getVerificationTokenByToken(token: string) {
    const response = await fetch(`/api/auth/check-verification-token`, {
      method: "POST",
      body: JSON.stringify({
        token: token
      })
    })
  }

  //check if token expired

  if (token) {
    const verifiedEmail = getVerificationTokenByToken(token)
  }


  return (<>
  
  
  </>)
}