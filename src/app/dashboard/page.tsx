import { MdAllInbox } from 'react-icons/md';
import TinyHolder from '@/components/dashboard/holders/TinyHolder';
import SimpleHolder from '@/components/dashboard/holders/SimpleHolder';
import AssessmentsGroupsTable from '@/components/dashboard/tables/AssessmentsGroupsTable';

function Dashboard() {
    return (
        <div>
            <section className='flex flex-wrap flex-gap-20'>
                <TinyHolder icon={<MdAllInbox />} title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-9' icon={<MdAllInbox />} mainTitle='Grupos de avaliações' subTitle='Últimos grupos cadastrados'>
                    <AssessmentsGroupsTable />
                </SimpleHolder>
                <SimpleHolder sizeClasses='col-xl col-xl-3' icon={<MdAllInbox />} mainTitle='Rank' subTitle='Usuários mais bem avaliados'/>
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-6' />
                <SimpleHolder sizeClasses='col-xl col-xl-6' />
            </section>

            <section className='flex m-t-20 flex-gap-20'>
                <SimpleHolder sizeClasses='col-xl col-xl-5' />
                <SimpleHolder sizeClasses='col-xl col-xl-4' />
                <SimpleHolder sizeClasses='col-xl col-xl-3' />
            </section>
        </div>
    );
}

export default Dashboard;