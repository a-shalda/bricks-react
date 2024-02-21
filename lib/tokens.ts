import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/db"

import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {

  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  // const existingToken = await getVerificationTokenByEmail(email)

  const { data, error } = await supabase
  .from('users')
  .update({ verification_token: token, token_expires: expires})
  .eq("email", email)


  return {
    email: email,
    token: token
  }
  // if (existingToken) {
  //   //if exist - delete
  // }
}