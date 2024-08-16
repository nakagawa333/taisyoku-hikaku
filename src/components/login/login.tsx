"use client"
import { Paths } from "@/constants/common/paths";
import Link from "next/link";
import { FormEvent, useRef } from "react";

//ログイン画面
export const Login = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        //TODO PC用
        // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={email}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            パスワード
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={password}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            href={Paths.SIGNUP}
                            className="py-2 text-blue-500"
                        >
                            アカウントを作成
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            ログイン
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
}