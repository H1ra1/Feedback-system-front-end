import { Roboto } from '@next/font/google';
import '../../styles/reset.scss';
import '../../styles/utils.global.scss';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

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
            <body className={ROBOTO.className}>
                <div className='default-dashboard-container'>
                    <aside className='default-dashboard-container__sidebar-holder'>
                        <Sidebar />
                    </aside>
                    
                    <main className='default-dashboard-container__main-content-holder'>
                        <Header />
                        <div className='default-dashboard-container__components-holder'>
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    )
}
