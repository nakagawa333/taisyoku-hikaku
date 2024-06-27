import supabase from "@/libs/supabase/supabaseClient";

/**
 * Supabaseのストレージから公開バケット内のファイルのURLを取得する
 * @param id バケット名
 * @param path パス
 * @returns 公開バケット内のファイルのURL
 */
export function getStoragePublicUrl(id:string,path:string){
    return supabase.storage.from(id).getPublicUrl(path);
}