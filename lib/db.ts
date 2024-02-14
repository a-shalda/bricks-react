import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)