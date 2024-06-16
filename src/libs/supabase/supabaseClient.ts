import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL:any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY:any = process.env.NEXT_PUBLIC_API_KEY;
const supabase = createClient(SUPABASE_URL,API_KEY);

export default supabase;