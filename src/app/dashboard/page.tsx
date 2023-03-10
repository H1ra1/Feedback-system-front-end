import { MdGroupWork, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { IoMdRocket } from 'react-icons/io';
import { RiUserStarFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import TinyHolder from '@/components/dashboard/holders/TinyHolder';
import SimpleHolder from '@/components/dashboard/holders/SimpleHolder';
import AssessmentsGroupsTable from '@/components/dashboard/tables/AssessmentsGroupsTable';
import AveragePerArea from '@/components/dashboard/analyzes/AveragePerArea';
import SimpleRank from '@/components/dashboard/SimpleRank';

async function getAssessmentsGroups() {
    const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/questions-group/company/` );

    if( ! RESPONSE.ok )
        throw new Error('Failed to fetch data');
    
    const RESPONDE_PARSED = await RESPONSE.json();

    return RESPONDE_PARSED.data;
}

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

async function Dashboard() {
    const ASSESSMENT_GROUPS      = await getAssessmentsGroups();
    const TOP_AREAS_BY_NOTE      = await getTopAreasBy( 'note' );
    const TOP_AREAS_BY_QUANTITY  = await getTopAreasBy( 'quantity' );
    const TOP_USERS_BY_NOTE      = await getTopUsersBy( 'note' );
    const TOTAL_USERS            = await getTotalUsers();

    const FORMATTED_USERS_RANK   = ( top_users: any ) => {
        const RANK_USERS: any = [];

        for( const user of top_users ) {
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
        <div>
            <section className='flex flex-wrap flex-gap-20'>
                <TinyHolder 
                    icon={ <IoMdRocket /> } 
                    title={ TOP_AREAS_BY_NOTE.areas[0].name } 
                    subtitle='Top ??rea'
                    description={ `Nota m??dia: ${TOP_AREAS_BY_NOTE.areas[0].area_average_note}` }
                />
                <TinyHolder 
                    icon={ <MdOutlineLocalFireDepartment /> } 
                    title={ TOP_AREAS_BY_QUANTITY.areas[0].name } 
                    subtitle='??rea mais avaliada'
                    description={ `Avalia????es recebidas: ${TOP_AREAS_BY_QUANTITY.areas[0].evaluations_done_count}` }
                />
                <TinyHolder 
                    icon={ <RiUserStarFill /> }
                    title={ TOP_USERS_BY_NOTE[0].name }
                    subtitle='Top Usu??rio'
                    description={ `Nota m??dia: ${TOP_USERS_BY_NOTE[0].note_average} \n Avalia????es recebidas: ${TOP_USERS_BY_NOTE[0].evaluations_done_count} \n Usu??rio com maior nota e com no m??nimo 4 avalia????es recebidas.` }
                />
                <TinyHolder icon={ <FaUsers /> } title={ TOTAL_USERS.total_users } subtitle='Total de usu??rios'/>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder overflow={ true } sizeClasses='col-xl col-xl-9' icon={<MdGroupWork />} mainTitle='Grupos de avalia????es' subTitle='??ltimos grupos cadastrados'>
                    <AssessmentsGroupsTable groups={ASSESSMENT_GROUPS}/>
                </SimpleHolder>
                <SimpleHolder sizeClasses='col-xl col-xl-3' icon={<RiUserStarFill />} mainTitle='Rank' subTitle='Usu??rios mais bem avaliados'>
                    <SimpleRank rank={ FORMATTED_USERS_RANK( TOP_USERS_BY_NOTE ) }/>
                </SimpleHolder>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-6' mainTitle='M??dia por ??reas' supTitle='M??dia dos pontos por ??reas'>
                    <AveragePerArea data={ TOP_AREAS_BY_NOTE }/>
                </SimpleHolder>
                <SimpleHolder sizeClasses='col-xl col-xl-6' mainTitle='M??dia por perguntas' supTitle='Pontua????o m??dia por cada pergunta' />
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-5' mainTitle='Pontua????o por usu??rios' supTitle='Pontua????o total por usu??rio' />
                <SimpleHolder sizeClasses='col-xl col-xl-4' mainTitle='Pontua????o por ??reas' supTitle='Pontua????o mensal de ??reas' />
                <SimpleHolder sizeClasses='col-xl col-xl-3' mainTitle='Total de respostas' supTitle='Total de respostas por ??reas' />
            </section>
        </div>
    );
}

export default Dashboard;