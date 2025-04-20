"use client"
import supabase from "@/libs/supabase/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import * as ja from "../../localization/ja/ja.json";

//TODO ログイン後の認証処理(アクセストークンをlocalStorageに保存するなど)の実装
//ログイン画面
export const Login = () => {
    return (
        <div className="w-96 mx-auto">
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={["google"]}
                localization={{
                    variables: ja
                }}
            />
        </div>
    );
}