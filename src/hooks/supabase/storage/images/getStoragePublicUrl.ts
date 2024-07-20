import supabase from "@/libs/supabase/supabaseClient";
import { DataPublicUrl } from "@/types/common/supabase/dataPublicUrl";

/**
 * Supabaseのストレージから公開バケット内のファイルのURLを取得する
 * @param id バケット名
 * @param path パス
 * @returns 公開バケット内のファイルのURL
 */
export function getStoragePublicUrl(id: string, path: string): DataPublicUrl {
    return supabase.storage.from(id).getPublicUrl(path);
}