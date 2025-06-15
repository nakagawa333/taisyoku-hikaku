"use client";
import { useQueryAuth } from "@/hooks/reactQuery/auth";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
};

//認証用コンテキスト
export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProviders(props: { children: React.ReactNode }) {
    //ログイン状態 (true:ログイン状態,false:ログアウト状態
    const [isLoggedIn, setLoggedIn] = useState(false);
    const { useAuthState } = useQueryAuth();

    //ログイン状態取得
    const { data: useAuthStateData
        , isLoading: useAuthStateLoaing, isError: useAuthStateIsError
    } = useAuthState();

    useEffect(() => {
        if (useAuthStateData && useAuthStateData?.isLogin) {
            setLoggedIn(true);
        }
    }, [useAuthStateData]);

    //データ取得中
    if (useAuthStateLoaing) {
        return;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}
