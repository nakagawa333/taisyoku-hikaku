import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL:string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY:string | undefined = process.env.NEXT_PUBLIC_API_KEY;

if(!SUPABASE_URL || !API_KEY){
    console.error("url",SUPABASE_URL);
    console.error("APIキー",API_KEY);
    throw new Error("環境変数が正しく設定されていません。");
}

const supabase = createClient(SUPABASE_URL,API_KEY);

export default supabase;