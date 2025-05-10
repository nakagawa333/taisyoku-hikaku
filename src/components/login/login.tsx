"use client"
import supabase from "@/libs/supabase/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import * as ja from "../../localization/ja/ja.json";

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