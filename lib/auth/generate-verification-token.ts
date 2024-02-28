import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/db"

export const generateVerificationToken = async (email: string) => {

  const token = uuidv4()
  // const expires = new Date(new Date().getTime())
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  try {

    const { data, error } = await supabase
    .from('users')
    .update({ verification_token: token, token_expires: expires})
    .eq("email", email)
    .select('id')
  
    if (data === null || error) {
      return null
    } 

    return {
      email: email,
      token: token
    }

  } catch (error) {
    return null
  }
}