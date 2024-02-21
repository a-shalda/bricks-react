import { supabase } from "@/lib/db"

export const getVerificationTokenByEmail = async (email: string) => {

  const { data, error } = await supabase
  .from('users')
  .select('verification_token')
  .eq('email', email)

  if (data) {
    return data 
  }
  else return null

  console.log(data)
}

export const getVerificationTokenByToken = async (token: string) => {

  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('verification_token', token)


  if (!data) {
    return { error: "Token does not exist"}
  }

  const hasExpired = new Date(data[0]["token_expires"]) < new Date()

  if (hasExpired) {
    return { error: "Token has expired"}
  }

  const exisitngUserEmail = data[0]["email"]

  if (data && !hasExpired) {

    const { data, error } = await supabase
    .from('users')
    .update({ is_verified: true })
    .eq("email", exisitngUserEmail)

    //and then we can delete the token

    return { success: "Email verified"}
  }

  console.log(data)
}