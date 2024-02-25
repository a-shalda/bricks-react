import { supabase } from "@/lib/db";
import { generateVerificationToken } from "@/lib/auth/generate-verification-token";
import { sendVerificationEmail } from "@/lib/auth/send-verification-email";


export async function POST(request: Request) {

  const { token, dictionary } = await request.json()

  try {

    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('verification_token', token)

    if (!data && error.code === "22P02") {
      return Response.json({ error: dictionary["Auth"]["check_token_api"]["error"]["invalid_token"] }, { status: 401 });
    }
    else if (!data) return Response.json({ error: dictionary["Auth"]["check_token_api"]["error"]["service_unavailable"] }, { status: 500 });

    const hasExpired = new Date(data[0]["token_expires"]) < new Date()

    //token expired, send a new verification email
    if (hasExpired) {

      const verificationToken = await generateVerificationToken(data[0].email)

      // verificationToken has been generated and inserted into db?
      if (!verificationToken) return Response.json({ error: dictionary["Auth"]["check_token_api"]["error"]["service_unavailable_token"] }, { status: 500 });

      // sendTokenEmail has been sent to user?
      const sendTokenEmail = await sendVerificationEmail(data[0].email, verificationToken.token, dictionary)

      // if sendTokenEmail was successful, return a success message
      if (sendTokenEmail) return Response.json({ error:dictionary["Auth"]["check_token_api"]["error"]["token_expired"] }, { status: 200 });
    }
  
    const existingUserEmail = data[0]["email"]
  
    //changing is_confirmed to true and deleting the token
    if (data && !hasExpired) {
  
      const { data, error } = await supabase
      .from('users')
      .update({ is_verified: true, verification_token: null })
      .eq("email", existingUserEmail)

      if (!error) {
        return Response.json({ message: dictionary["Auth"]["check_token_api"]["success"] }, { status: 200 });
      }
      else return Response.json({ error: dictionary["Auth"]["check_token_api"]["error"]["service_unavailable"] }, { status: 500 });
    }
  
    return Response.json(data);

  } catch (error) {
    return Response.json({ error });
  }
}