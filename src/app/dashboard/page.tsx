import { MdGroupWork, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { IoMdRocket } from 'react-icons/io';
import { RiUserStarFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import TinyHolder from '@/components/dashboard/holders/TinyHolder';
import SimpleHolder from '@/components/dashboard/holders/SimpleHolder';
import AssessmentsGroupsTable from '@/components/dashboard/tables/AssessmentsGroupsTable';
import AveragePerArea from '@/components/dashboard/analyzes/AveragePerArea';
import SimpleRank from '@/components/dashboard/SimpleRank';
import QuestionsAverageFromGroupAnalysis from '@/components/dashboard/analyzes/QuestionsAverageFromGroupAnalysis';
import PointsPerUserAnalysis from '@/components/dashboard/analyzes/PointsPerUserAnalysis';
import PointsPerAreas from '@/components/dashboard/analyzes/PointsPerAreas';
import TotalAnswersPerAreas from '@/components/dashboard/analyzes/TotalAnswersPerAreas';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import CompareAreas from '@/components/dashboard/analyzes/CompareAreas';

async function getTopAreasBy( orderby: string ) {
    const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/top-areas?orderby=${orderby}` );

    if( ! RESPONSE.ok )
        throw new Error('Failed to fetch data');
    
    const RESPONDE_PARSED = await RESPONSE.json();

    return RESPONDE_PARSED.data;
}

async function getTopUsersBy( orderby: string ) {
    const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/top-users?orderby=${orderby}` );

    if( ! RESPONSE.ok )
        throw new Error('Failed to fetch data');
    
    const RESPONDE_PARSED = await RESPONSE.json();

    return RESPONDE_PARSED.data;
}

async function getTotalUsers() {
    const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/total-users/` );

    if( ! RESPONSE.ok )
        throw new Error('Failed to fetch data');
    
    const RESPONDE_PARSED = await RESPONSE.json();

    return RESPONDE_PARSED.data;
}

async function getTAverageQuestionsFromGroup( question_group_id: number ) {
    const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-average-from-group/${question_group_id}/` );

    if( ! RESPONSE.ok )
        throw new Error('Failed to fetch data');
    
    const RESPONDE_PARSED = await RESPONSE.json();

    return RESPONDE_PARSED.data;
}

async function Dashboard() {
    const SESSION                       = await getServerSession( authOptions );
    const TOP_AREAS_BY_NOTE             = SESSION.user?.data.master ? await getTopAreasBy( 'note' ) : {};
    const TOP_AREAS_BY_QUANTITY         = SESSION.user?.data.master ? await getTopAreasBy( 'quantity' ) : {};
    const TOP_USERS_BY_NOTE             = SESSION.user?.data.master ? await getTopUsersBy( 'note' ) : {};
    const TOTAL_USERS                   = SESSION.user?.data.master ? await getTotalUsers() : {};
    const AVERAGE_QUESTIONS_FROM_GROUP  = SESSION.user?.data.master ? await getTAverageQuestionsFromGroup( 31 ) : {};
    const POINTS_PER_AREAS              = SESSION.user?.data.master ? await getTopAreasBy( 'points' ) : {};
    
    const FORMATTED_USERS_RANK   = ( top_users: any ) => {
        const RANK_USERS: any = [];

        for( const user of top_users.users ) {
            if( RANK_USERS.length == 6 )
                break;

            RANK_USERS.push( {
                key:   user.id,
                label: user.name,
                value: user.note_average,
                icon:  user.acronym
            } );
        }

        return RANK_USERS;
    }

    return (
        <>
            { SESSION.user?.data.master ? (
                <section className='flex flex-wrap flex-gap-20'>
                    <TinyHolder 
                        icon={ <IoMdRocket /> } 
                        title={ TOP_AREAS_BY_NOTE.areas[0].name } 
                        subtitle='Top área'
                        description={ `Nota média: ${TOP_AREAS_BY_NOTE.areas[0].area_average_note}` }
                    />
                    <TinyHolder 
                        icon={ <MdOutlineLocalFireDepartment /> } 
                        title={ TOP_AREAS_BY_QUANTITY.areas[0].name } 
                        subtitle='Área mais avaliada'
                        description={ `Avaliações recebidas: ${TOP_AREAS_BY_QUANTITY.areas[0].evaluations_done_count}` }
                    />
                    <TinyHolder 
                        icon={ <RiUserStarFill /> }
                        title={ TOP_USERS_BY_NOTE.users[0].name }
                        subtitle='Top Usuário'
                        description={ `Nota média: ${TOP_USERS_BY_NOTE.users[0].note_average} \n Avaliações recebidas: ${TOP_USERS_BY_NOTE.users[0].evaluations_done_count} \n Usuário com maior nota e com no mínimo 4 avaliações recebidas.` }
                    />
                    <TinyHolder icon={ <FaUsers /> } title={ TOTAL_USERS.total_users } subtitle='Total de usuários'/>
                </section>
            ) : '' }
            

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder overflow={ true } sizeClasses={`col-xl ${ SESSION?.user.master ? 'col-xl-9' : 'col-xl-12' }`} icon={<MdGroupWork />} mainTitle='Grupos de avaliações' subTitle='Últimos grupos cadastrados'>
                    <AssessmentsGroupsTable />
                </SimpleHolder>

                { SESSION.user?.data.master ? (
                    <SimpleHolder sizeClasses='col-xl col-xl-3' icon={<RiUserStarFill />} mainTitle='Rank' subTitle='Usuários mais bem avaliados'>
                        <SimpleRank rank={ FORMATTED_USERS_RANK( TOP_USERS_BY_NOTE ) }/>
                    </SimpleHolder>
                ) : '' }
            </section>
            
            { SESSION.user?.data.master ? (
            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-12' icon={<RiUserStarFill />} bodyStyle={ { height: 'calc( 100% - 120px )' } } mainTitle='Áreas' subTitle='Comparações entre áreas'>
                    <CompareAreas />
                </SimpleHolder>
            </section>
            ) : '' }
            
            { SESSION.user?.data.master ? (
                <>
                    <section className='flex m-t-20 flex-gap-20'>
                        <SimpleHolder sizeClasses='col-xl col-xl-5' mainTitle='Pontuação por usuários' supTitle='Pontuação total por usuário'>
                            <PointsPerUserAnalysis data={ TOP_USERS_BY_NOTE } />
                        </SimpleHolder>
                        <SimpleHolder sizeClasses='col-xl col-xl-4' mainTitle='Pontuação por áreas' supTitle='Pontuação mensal de áreas'>
                            <PointsPerAreas data={ POINTS_PER_AREAS } />
                        </SimpleHolder>
                        <SimpleHolder sizeClasses='col-xl col-xl-3' mainTitle='Total de respostas' supTitle='Total de respostas por áreas'>
                            <TotalAnswersPerAreas data={ POINTS_PER_AREAS } />
                        </SimpleHolder>
                    </section>
                </>
            ) : '' }
        </>
    );
}

export default Dashboard;