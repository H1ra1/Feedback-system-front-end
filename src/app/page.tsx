import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

async function Home() {
    const  SESSION = await getServerSession( authOptions );

    if( ! SESSION || ! SESSION.user?.data ) {
        redirect( '/api/auth/signin' );
    } else {
        redirect( '/dashboard' );
    }

    return (
        <h1>Sistema de avaliações</h1>
    )
}

export default Home;