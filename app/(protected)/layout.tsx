import { SessionProvider } from "next-auth/react"


interface ProtectedPageProps {
    children: React.ReactElement;
}

export default function ProtectedLayout({
    children
}: ProtectedPageProps){
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}