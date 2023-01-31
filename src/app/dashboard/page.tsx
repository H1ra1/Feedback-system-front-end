import Sidebar from '../../components/dashboard/Sidebar';
import TinyHolder from '../../components/dashboard/holders/TinyHolder';

function Dashboard() {
    return (
        <div>
            <section className='flex flex-wrap flex-gap-20'>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
                <TinyHolder title='Título do block' subtitle='Subtitulo do bloco' description='Descritivo do bloco opcional.'/>
            </section>
        </div>
    );
}

export default Dashboard;