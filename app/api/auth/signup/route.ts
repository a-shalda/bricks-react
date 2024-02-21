import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { supabase } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/verification-mail"
import { generateVerificationToken } from "@/lib/tokens"

export async function POST(request: Request) {
  
  try {
    const { email, password } = await request.json()
    //validate

    const hashedPassword = await hash(password, 10)

    const { data, error } = await supabase
    .from('users')
    .insert([
      { email: email, password: hashedPassword },
    ])

    const verificationToken = await generateVerificationToken(email)

    console.log(`verificationToken: ${verificationToken}`)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    // console.log({ email, password })
  } catch(error) {
    console.log({ error })
    return Response.json({ error });
  }

  // return NextResponse.json({ message: "success"})
}