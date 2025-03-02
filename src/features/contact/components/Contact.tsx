export default function Contact() {

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: 0,
                }}
            />

            <iframe
                src={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                title="Google Form"
                allowFullScreen
            >
                Loading…
            </iframe>
        </>
    )
}