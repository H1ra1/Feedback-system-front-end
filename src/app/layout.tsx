import { Roboto } from '@next/font/google';
import '../styles/reset.scss';

const ROBOTO = Roboto({
    weight: ['400'],
    subsets: ['latin']
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={ROBOTO.className}>{children}</body>
        </html>
    )
}
