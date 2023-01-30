import { Roboto } from '@next/font/google';
import '../../styles/reset.scss';
import utilsStyles from '../../styles/utils.module.scss';
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
                <div className={utilsStyles['default-dashboard-container']}>
                    <aside className={utilsStyles['default-dashboard-container__sidebar-holder']}>
                        <Sidebar />
                    </aside>
                    
                    <main className={utilsStyles['default-dashboard-container__main-content-holder']}>
                        <Header />
                        <div className={`${utilsStyles['default-dashboard-container__components-holder']}`}>
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    )
}
