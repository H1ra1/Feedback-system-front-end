import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import UsersListControl from '@/components/dashboard/UsersListControl';


async function Dashboard() {
    const SESSION = await getServerSession( authOptions );

    return (
        <>
            <section className='flex m-t-20 flex-gap-20'>
                <UsersListControl />
            </section>
        </>
    );
}

export default Dashboard;