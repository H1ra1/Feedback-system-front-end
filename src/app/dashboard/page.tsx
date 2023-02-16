import { MdGroupWork, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { IoMdRocket } from 'react-icons/io';
import { RiUserStarFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import TinyHolder from '@/components/dashboard/holders/TinyHolder';
import SimpleHolder from '@/components/dashboard/holders/SimpleHolder';
import AssessmentsGroupsTable from '@/components/dashboard/tables/AssessmentsGroupsTable';

function Dashboard() {
    return (
        <div>
            <section className='flex flex-wrap flex-gap-20'>
                <TinyHolder icon={ <IoMdRocket /> } title='Mesa RV' subtitle='Top área'/>
                <TinyHolder icon={ <MdOutlineLocalFireDepartment /> } title='Marketing' subtitle='Área mais avaliada'/>
                <TinyHolder icon={ <RiUserStarFill /> } title='Gabriel Câmara' subtitle='Top Usuário'/>
                <TinyHolder icon={ <FaUsers /> } title='48' subtitle='Total de usuários'/>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-9' icon={<MdGroupWork />} mainTitle='Grupos de avaliações' subTitle='Últimos grupos cadastrados'>
                    <AssessmentsGroupsTable />
                </SimpleHolder>
                <SimpleHolder sizeClasses='col-xl col-xl-3' icon={<RiUserStarFill />} mainTitle='Rank' subTitle='Usuários mais bem avaliados'/>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-6' mainTitle='Média por áreas' supTitle='Média dos pontos por áreas' />
                <SimpleHolder sizeClasses='col-xl col-xl-6' mainTitle='Média por perguntas' supTitle='Pontuação média por cada pergunta' />
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-5' mainTitle='Pontuação por usuários' supTitle='Pontuação total por usuário' />
                <SimpleHolder sizeClasses='col-xl col-xl-4' mainTitle='Pontuação por áreas' supTitle='Pontuação mensal de áreas' />
                <SimpleHolder sizeClasses='col-xl col-xl-3' mainTitle='Total de respostas' supTitle='Total de respostas por áreas' />
            </section>
        </div>
    );
}

export default Dashboard;