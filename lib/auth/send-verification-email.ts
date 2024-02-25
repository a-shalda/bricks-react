import { Resend } from 'resend';
import { VerificationEmail } from '@/components/email/verification-email';


export const sendVerificationEmail = async (email: string, token: string, dictionary: any ) => {

  const resend = new Resend(process.env.RESEND_API_KEY);
  const confirmLink = `${process.env.NEXTAUTH_URL}/${dictionary["Language"]}/auth/new-verification?token=${token}`

  try {
    const data = await resend.emails.send({
      from: `${dictionary["Auth"]["email"]["website_name"]} <no-reply@${process.env.RESEND_DOMAIN}>`,
      to: email,
      subject: dictionary["Auth"]["email"]["subject"],
      react: VerificationEmail({ 
        link: confirmLink, 
        text: dictionary["Auth"]["email"]["text"], 
        textLink: dictionary["Auth"]["email"]["textLink"] }) as React.ReactElement,
    });


    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}