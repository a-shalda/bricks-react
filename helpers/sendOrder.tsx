import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function sendOrderDb(order: any) {

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        order_details: order.order,
        name: order.name,
        phone: order.phone
      },
    ])

    if (error) return false
    else if (!error) return true
}