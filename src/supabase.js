import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmxanrrqajhcqvawfzyq.supabase.co' 
const supabaseAnonKey = 'sb_publishable_E6d_l8hljmVFf2gV0ZiDug_rgp5wdBW' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
