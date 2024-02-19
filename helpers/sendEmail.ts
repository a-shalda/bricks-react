import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(order: any) {
  try {
    const data = await resend.emails.send({
      from: `orders@klinkernaya-plitka.ru`,
      to: process.env.RESEND_EMAIL!,
      subject: `${order.orderNumber + order.name + order.total + order.date + order.phone}`,
      react: EmailTemplate({ order: order }) as React.ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}