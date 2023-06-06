import { Roboto } from '@next/font/google';
import '@/styles/reset.scss';
import '@/styles/utils.global.scss';
import { Providers } from '@/app/providers';

const ROBOTO = Roboto({
    weight: [ '100', '300', '400', '500', '700', '900' ],
    subsets: [ 'latin' ]
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body className={`${ROBOTO.className} custom-purple-scrollbar`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
