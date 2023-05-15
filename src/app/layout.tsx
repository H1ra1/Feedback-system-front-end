import AuthProvider from '@/providers/AuthProvider';

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
