import React from 'react'
import TabsHolder from '../../holders/TabsHolder';
import GroupAnalysisByQuestions from '../GroupAnalysisByQuestions';

interface UserToUserAnalysisProps {
    group_id: number
}

function GroupAnalysis( props: UserToUserAnalysisProps ) {
    const TABS = [
        {
            tab_id: 'tab-area-analysis',
            tab_name: 'Área'
        }
    ];

    const TABS_ITEMS = [
        {
            tab_id: 'tab-area-analysis',
            tab_title: 'Área',
            tab_subtitle: 'Estatísticas do grupo por área com base nas perguntas',
            tab_content: <GroupAnalysisByQuestions group_id={ props.group_id } />
        }
    ];

    return (
        <div>
            <TabsHolder tabs={TABS} tabs_items={TABS_ITEMS} />
        </div>
    )
}

export default GroupAnalysis;