import React from 'react'
import TabsHolder from '../../holders/TabsHolder';
import UsersAnalysis from '../UsersAnalysis';
import QuestionsAnalysis from '../QuestionsAnalysis';
import BetweenUsersAnalysis from '../BetweenUsersAnalysis';

interface UserToUserAnalysisProps {
    group_id: number
    rating_user: boolean
}

function UserToUserAnalysis( props: UserToUserAnalysisProps ) {
    const TABS = [
        {
            tab_id: 'tab-users-analysis',
            tab_name: 'Usuários'
        },
        {
            tab_id: 'tab-questions-analysis',
            tab_name: 'Perguntas'
        },
        {
            tab_id: 'tab-comparative-analysis',
            tab_name: 'Comparativo'
        }
    ];

    const TABS_ITEMS = [
        {
            tab_id: 'tab-users-analysis',
            tab_title: 'Usuários',
            tab_subtitle: 'Estatísticas do grupo por usuários',
            tab_content: <UsersAnalysis group_id={ props.group_id } rating_user={ props.rating_user } />
        },
        {
            tab_id: 'tab-questions-analysis',
            tab_title: 'Perguntas',
            tab_subtitle: 'Estatísticas do grupo por usuários com base nas perguntas',
            tab_content: <QuestionsAnalysis group_id={ props.group_id }/>
        },
        {
            tab_id: 'tab-comparative-analysis',
            tab_title: 'Comparativo',
            tab_subtitle: 'Estatísticas do grupo comparativas entre os usuários',
            tab_content: <BetweenUsersAnalysis group_id={ props.group_id }/>
        }
    ];

    return (
        <div>
            <TabsHolder tabs={TABS} tabs_items={TABS_ITEMS} />
        </div>
    )
}

export default UserToUserAnalysis;