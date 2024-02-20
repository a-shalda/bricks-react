import { supabase } from "@/lib/db";


export async function POST(request: Request) {

  const order = await request.json()

  try {
    const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        order_details: order.order,
        name: order.name,
        phone: order.phone
      },
    ])
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}