import { Resend } from 'resend';
import { VerificationEmail } from '@/components/email/verification-email';

const resend = new Resend(process.env.RESEND_API_KEY);

import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const sendVerificationEmail = async (email: string, token: string ) => {

  // const dictionary = await getDictionary(params!.lang);
  const confirmLink = `${process.env.NEXTAUTH_URL}/new-verification?token=${token}`

  console.log(`verificationToken: ${confirmLink}`)

  try {
    const data = await resend.emails.send({
      from: `no-reply@${process.env.RESEND_DOMAIN}`,
      to: email,
      // subject: dictionary["Auth"]["email"]["subject"],
      subject: "Link",

      // react: VerificationEmail({ link: confirmLink, text: dictionary["Auth"]["email"]["text"] }) as React.ReactElement,
      react: VerificationEmail({ link: confirmLink, text: "Link: " }) as React.ReactElement,

    });

    console.log(data)

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}