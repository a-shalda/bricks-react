import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';


export async function POST(request: Request) {

  const order = await request.json()
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: `orders@${process.env.RESEND_DOMAIN}`,
      to: process.env.RESEND_EMAIL!,
      subject: `${order.orderNumber + order.name + order.total + order.date + order.phone}`,
      react: EmailTemplate({ order: order }) as React.ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}