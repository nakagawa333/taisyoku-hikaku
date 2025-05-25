"use client";
import Snackbar from "@/components/snackbar";
import useAuthInfo from "../hooks/useAuthInit";

export default function AuthInit() {
    const { snackbarData, closeSuccessSnackbar } = useAuthInfo();
    return (
        <>
            <Snackbar
                state={snackbarData.state}
                message={snackbarData.message}
                time={snackbarData.time}
                isOpen={snackbarData.isOpen}
                onClose={closeSuccessSnackbar}
            />
        </>
    )
}