import { supabase } from "@/lib/db";
import { NextResponse } from "next/server"


export async function POST(request: Request) {

  const req = await request.json()

  try {

    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('verification_token', req.token)
  
    if (!data) {
      // return Response.json(data);
      return Response.json({ error });
    }

    const hasExpired = new Date(data[0]["token_expires"]) < new Date()

    console.log(new Date())
    console.log(new Date(data[0]["token_expires"]))

  
    if (hasExpired) {
      // return Response.json(data);
      return Response.json({ error });
    }
  
    const existingUserEmail = data[0]["email"]
  
    if (data && !hasExpired) {
  
      const { data, error } = await supabase
      .from('users')
      .update({ is_verified: true })
      .eq("email", existingUserEmail)
  
      //and then we can delete the token

  
      // return NextResponse.json({ message: "email verified"})
      // return { success: "Email verified"}
    }
  
    console.log(data)
  

    return Response.json(data);

  } catch (error) {
    return Response.json({ error });
  }
}