import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/db";
import { compare } from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
     async signIn({ user, account }) {
      if (account?.provider === "credentials") {

        const { data, error } = await supabase
        .from('users')
        .select('is_verified')
        .eq("id", user.id)

        if (!data![0]["is_verified"]) {
          return false
        }
      }

      return true
     }
  },
  providers: [CredentialsProvider({
  credentials: {
    email: {},
    password: {}
  },
  async authorize(credentials, req) {
    // You need to provide your own logic here that takes the credentials
    // submitted and returns either a object representing a user or value
    // that is false/null if the credentials are invalid.
    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    // You can also use the `req` object to obtain additional parameters
    // (i.e., the request IP address)

    //validate
     
    let { data: user, error } = await supabase
    .from('users')
    .select()
    .eq('email', credentials?.email)

    // console.log(user![0].password)

    const passwordCorrect = await compare(credentials?.password || "", user![0].password)

    if (passwordCorrect) {

      // console.log({
      //   id: user![0].id,
      //   email: user![0].email,
      // })
      return {
        id: user![0].id,
        email: user![0].email,
      }
    }



    // const res = await fetch("/your/endpoint", {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    //   headers: { "Content-Type": "application/json" }
    // })
    // const user = await res.json()

    // // If no error and we have user data, return it
    // if (res.ok && user) {
    //   return user
    // }
    // Return null if user data could not be retrieved
    return null
  }
})]
})

export { handler as GET, handler as POST} 