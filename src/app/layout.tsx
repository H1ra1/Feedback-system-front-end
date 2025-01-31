import AuthProvider from '@/providers/AuthProvider';
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <AuthProvider>
                <body>{children}</body>
            </AuthProvider>
        </html>
    )
}
