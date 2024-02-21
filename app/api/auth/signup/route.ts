import { hash } from "bcryptjs"
import { supabase } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/auth/send-verification-email"
import { generateVerificationToken } from "@/lib/auth/generate-verification-token"


export async function POST(request: Request) {
  
  try {
    const { email, password, dictionary } = await request.json()
    //validate

    const hashedPassword = await hash(password, 10)

    const { data, error } = await supabase
    .from('users')
    .insert([
      { email: email, password: hashedPassword },
    ])
    .select('id')

    //Checking if emails exists and connection available
    if (data === null && error?.code === "23505") {
      return Response.json({ error: "User exists" }, { status: 401 });
    } 
    else if (data === null) return Response.json({ error: "Service unavailable" }, { status: 500 });

    if (data) {
      const verificationToken = await generateVerificationToken(email)

      // verificationToken has been generated and inserted into db?
      if (!verificationToken) return Response.json({ error: "Service unavailable (Failed to generate confirmation email token)" }, { status: 500 });

      // sendTokenEmail has been sent to user?
      const sendTokenEmail = await sendVerificationEmail(verificationToken.email, verificationToken.token, dictionary)

      // if sendTokenEmail was successful, return a success message
      if (sendTokenEmail) return Response.json({ message: "Email verification sent!" }, { status: 200 });
    }

    return Response.json({ error: 'Failed to send verification email, try again!' }, { status: 500 })
    
  } catch(error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}