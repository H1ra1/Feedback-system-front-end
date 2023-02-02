import TinyHolder from '../../components/dashboard/holders/TinyHolder';
import { FaAccessibleIcon } from 'react-icons/fa';

function Dashboard() {
    return (
        <div>
            <section className='flex flex-wrap flex-gap-20'>
                <TinyHolder icon={<FaAccessibleIcon />} title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
            </section>
        </div>
    );
}

export default Dashboard;