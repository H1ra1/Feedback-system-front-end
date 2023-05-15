import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

async function Home() {
    const  SESSION                      = await getServerSession( authOptions );

    if( ! SESSION ) {
        redirect( '/api/auth/signin' );
    } else {
        redirect( '/dashboard' );
    }
}

export default Home;