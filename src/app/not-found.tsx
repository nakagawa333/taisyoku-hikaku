"use client"
import Footer from "@/components/footer";
import Header from "@/components/headers/header";

/**
 * 404 エラーページコンポーネント
 * @returns 
 */
export default function NotFound() {
    return (
        <>
            <Header />
            <h1>404 - Page Not Found</h1>
            <Footer />
        </>
    )
}