import { Roboto } from '@next/font/google';
import '../../styles/reset.scss';
import '../../styles/utils.global.scss';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import AuthProvider from '@/providers/AuthProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
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
    const  SESSION = await getServerSession( authOptions );

    if( ! SESSION || ! SESSION.user?.data ) {
        redirect( '/api/auth/signin' );
    }

    return (
        <html lang="en">
            <body className={`${ROBOTO.className} custom-purple-scrollbar`} suppressHydrationWarning={ true }>
                <AuthProvider>
                    <div className='default-dashboard-container'>
                        <aside className='default-dashboard-container__sidebar-holder'>
                            <Sidebar />
                        </aside>
                        
                        <main className='default-dashboard-container__main-content-holder'>
                            <Header />
                            <div className='default-dashboard-container__components-holder'>
                                <Providers>
                                    {children}
                                </Providers>
                            </div>
                        </main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}
