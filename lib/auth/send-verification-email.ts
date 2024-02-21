import { Resend } from 'resend';
import { VerificationEmail } from '@/components/email/verification-email';


export const sendVerificationEmail = async (email: string, token: string, dictionary: any ) => {

  const resend = new Resend(process.env.RESEND_API_KEY);
  const confirmLink = `${process.env.NEXTAUTH_URL}/${dictionary["Language"]}/auth/new-verification?token=${token}`

  // console.log(`verificationToken: ${confirmLink}`)

  try {
    const data = await resend.emails.send({
      from: `no-reply@${process.env.RESEND_DOMAIN}`,
      to: email,
      // subject: dictionary["Auth"]["email"]["subject"],
      subject: "Link",

      // react: VerificationEmail({ link: confirmLink, text: dictionary["Auth"]["email"]["text"] }) as React.ReactElement,
      react: VerificationEmail({ link: confirmLink, text: "Link: " }) as React.ReactElement,

    });

    // console.log(data)

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}