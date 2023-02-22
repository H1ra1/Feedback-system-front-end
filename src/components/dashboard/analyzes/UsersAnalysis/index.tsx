'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import TinySimpleTable from '../../tables/TinySimpleTable';
import colors from '@/styles/colors.module.scss';
import { 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis, 
    Radar, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid
} from 'recharts';

interface UsersAnalysisProps {
    group_id: number
}

interface UsersTableBody {
    row_type: string
    row_pre_id: string
    items: any[]
}

function UsersAnalysis( props: UsersAnalysisProps ) {
    const [ userSeleted, setUserSelected ] = useState< string >( 'Selecione um usuário' );
    const [ USER_SELECTED_NOTE_AVERAGE, setUSER_SELECTED_NOTE_AVERAGE ] = useState< string >( '~' );
    const [ questionsChartsData, setQuestionsChartsData ] = useState< any >( [] );
    const [ USERS_FROM_GROUP, setUSERS_FROM_GROUP ] = useState< any[] >( [] );
    const [ USERS_TABLE_BODY, setUSERS_TABLE_BODY ] = useState< UsersTableBody[] >( [] );

    useEffect( () => {
        async function getUsersAnalysis() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/360/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            const ITEMS_USERS_TABLE:UsersTableBody[] = [];
            const USERS_FROM_GROUP_DATA: any[] = [];
            RESPONDE_PARSED.data.forEach( ( user_evaluated: any ) => {
                USERS_FROM_GROUP_DATA.push( {
                    name: user_evaluated.user_evaluated_name,
                    note_average: user_evaluated.note_average,
                    note_per_questions: user_evaluated.evaluations_notes_per_questions[0]
                } );

                ITEMS_USERS_TABLE.push( {
                    row_type: 'select',
                    row_pre_id: 'user',
                    items: [
                        ( <p key={0}>{ user_evaluated.user_evaluated_name }</p> ),
                        ( <p key={1}> { user_evaluated.note_average } </p> )
                    ]
                } );
            } );

            setUSERS_FROM_GROUP( USERS_FROM_GROUP_DATA );
            setUSERS_TABLE_BODY( ITEMS_USERS_TABLE );
        }

        getUsersAnalysis();
    }, [ props.group_id ] );

    const USERS_TABLE_HEAD = [
        {
            title: 'Usuários'
        },
        {
            title: 'Média'
        }
    ];

    function usersListClickHandler( e: MouseEvent, user_index: number ) {
        const SELECTED_USERNAME = USERS_FROM_GROUP[ user_index ].name;
        const SELECTED_QUESTIONS_CHART_DATA:any[] = [];

        console.log( USERS_FROM_GROUP[ user_index ].note_per_questions );

        USERS_FROM_GROUP[ user_index ].note_per_questions.forEach( ( question: any ) => {
            SELECTED_QUESTIONS_CHART_DATA.push( {
                question: question.question_id,
                points: question.question_note_average
            } );
        } );

        setUserSelected( SELECTED_USERNAME );
        setUSER_SELECTED_NOTE_AVERAGE( USERS_FROM_GROUP[ user_index ].note_average )
        setQuestionsChartsData( SELECTED_QUESTIONS_CHART_DATA );
    }

    return (
        <div className={`${styles['users-analysis']} flex flex-gap-20`}>
            <div className={`${styles['users-analysis__side_holder']} col-xl col-xl-3`}>
                <TinySimpleTable 
                    head={USERS_TABLE_HEAD} 
                    body={USERS_TABLE_BODY} 
                    body_row_click_handler={ usersListClickHandler } 
                    table_name='users-analysis-user-filter'
                />
            </div>

            <div className={`${styles['users-analysis__content_holder']} col-xl col-xl-9 custom-purple-scrollbar`}>
                <div className={`${styles['users-analysis-select-user-infos']} flex flex-align-center flex-justify-between`}>
                    <h3 className={`${styles['users-analysis-select-user-infos__user_name']}`}>{ userSeleted }</h3>
                    <div className={`${styles['users-analysis-select-user-infos__user_average_note']}`}>
                        <p>Nota média: { USER_SELECTED_NOTE_AVERAGE }</p>
                    </div>
                </div>

                <div className={`${styles['users-analysis-chart-holder']} flex flex-column flex-justify-center flex-align-center flex-gap-20`}>
                    { questionsChartsData.length > 0 && (
                        <>
                            <ResponsiveContainer width={500} aspect={4/2}>
                                <RadarChart data={questionsChartsData}>
                                    <PolarGrid />
                                    
                                    <PolarAngleAxis dataKey="question" />

                                    <PolarRadiusAxis angle={30} domain={[0, 5]} />

                                    <Radar 
                                        name='Gabriel Càmara' 
                                        dataKey='points' 
                                        stroke={colors.highlightColor} 
                                        fill={colors.highlightColor} 
                                        fillOpacity={0.6}
                                    />

                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>

                            <ResponsiveContainer width={350} aspect={4/2}>
                                <BarChart data={questionsChartsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey='points' fill={colors.highlightColor}>
                                    </Bar>
                                    <Tooltip />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    ) }
                </div>
            </div>
        </div>
    );
}

export default UsersAnalysis;