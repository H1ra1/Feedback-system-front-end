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
    CartesianGrid,
    XAxis,
    YAxis,
    LabelList
} from 'recharts';
import FeederLoading from '../../loadings/FeederLoading';

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
    const [ userSelectedNoteAverage, setUserSelectedNoteAverage ] = useState< string >( '~' );
    const [ userEvaluationsReceived, setUserEvaluationsReceived ] = useState< string >( '~' );
    const [ questionsChartsData, setQuestionsChartsData ] = useState< any >( [] );
    const [ userFromGroup, setUserFromGroup ] = useState< any[] >( [] );
    const [ usersTableBody, setUsersTableBody ] = useState< UsersTableBody[] >( [] );
    const [ loading, setLoading ] = useState< boolean >( true );

    useEffect( () => {
        async function getUsersAnalysis() {
            setLoading( true );
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/360/${props.group_id}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            const ITEMS_USERS_TABLE:UsersTableBody[] = [];
            const userFromGroup_DATA: any[] = [];
            RESPONDE_PARSED.data.forEach( ( user_evaluated: any ) => {
                userFromGroup_DATA.push( {
                    name: user_evaluated.user_evaluated_name,
                    note_average: user_evaluated.note_average,
                    note_per_questions: user_evaluated.evaluations_notes_per_questions[0],
                    evaluations_received: user_evaluated.evaluations_done
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

            setUserFromGroup( userFromGroup_DATA );
            setUsersTableBody( ITEMS_USERS_TABLE );
            setLoading( false );
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
        const SELECTED_USERNAME = userFromGroup[ user_index ].name;
        const SELECTED_QUESTIONS_CHART_DATA:any[] = [];

        userFromGroup[ user_index ].note_per_questions.forEach( ( question: any ) => {
            SELECTED_QUESTIONS_CHART_DATA.push( {
                question: question.question_alias,
                points: question.question_note_average
            } );
        } );

        setUserSelected( SELECTED_USERNAME );
        setUserSelectedNoteAverage( userFromGroup[ user_index ].note_average );
        setUserEvaluationsReceived( userFromGroup[ user_index ].evaluations_received );
        setQuestionsChartsData( SELECTED_QUESTIONS_CHART_DATA );
    }

    function customTooltip( { active, payload, label }: any ) {
        if( active && payload && payload.length )
            return (
                <div className="default-custom-tooltip">
                    <div className="default-custom-tooltip__header">
                        <p>{ payload[0].payload.question }</p>
                    </div>

                    <div className="default-custom-tooltip__content">
                        <p className="label"><strong>Nota média:</strong> { payload[0].value }</p>
                    </div>
                </div>
            );
    }

    function customBarLabelList( props: any ) {
        const { x, y, width, height, value } = props;
        const radius = 15;

        return (
            <g>
            <circle cx={x + width / 2} cy={y - radius - 5} r={radius} fill={colors.highlightColor} />
                <text x={x + width / 2} y={y - radius - 5} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={10}>
                    { value }
                </text>
            </g>
        );
    }

    return (
        <>
            { loading ? <FeederLoading /> :
                <div className={`${styles['users-analysis']} flex flex-gap-20`}>
                    <div className={`${styles['users-analysis__side_holder']} col-xl col-xl-3`}>
                        <TinySimpleTable 
                            head={USERS_TABLE_HEAD} 
                            body={usersTableBody} 
                            body_row_click_handler={ usersListClickHandler } 
                            table_name='users-analysis-user-filter'
                        />
                    </div>
        
                    <div className={`${styles['users-analysis__content_holder']} col-xl col-xl-9 custom-purple-scrollbar`}>
                        <div className={`${styles['users-analysis-select-user-infos']} flex flex-align-center flex-justify-between`}>
                            <h3 className={`${styles['users-analysis-select-user-infos__user_name']}`}>{ userSeleted }</h3>
                            <div className={`${styles['users-analysis-select-user-infos__user_average_note']}`}>
                                <p>Avalaições recebidas: { userEvaluationsReceived }</p>
                            </div>
                            <div className={`${styles['users-analysis-select-user-infos__user_average_note']}`}>
                                <p>Nota média: { userSelectedNoteAverage }</p>
                            </div>
                        </div>
        
                        <div className={`${styles['users-analysis-chart-holder']} flex flex-column flex-justify-center flex-align-center flex-gap-20 m-t-20`}>
                            { questionsChartsData.length > 0 && (
                                <>
                                    <ResponsiveContainer width={600} aspect={4/2}>
                                        <RadarChart data={questionsChartsData}>
                                            <PolarGrid />
                                            
                                            <PolarAngleAxis dataKey="question" />
        
                                            <PolarRadiusAxis angle={30} domain={[1, 5]} />
        
                                            <Radar 
                                                dataKey='points' 
                                                stroke={colors.highlightColor} 
                                                fill={colors.highlightColor} 
                                                fillOpacity={0.6}
                                            />
        
                                            <Tooltip content={ customTooltip } />
                                        </RadarChart>
                                    </ResponsiveContainer>
        
                                    <ResponsiveContainer width={600} aspect={4/2}>
                                        <BarChart data={questionsChartsData} margin={ { top: 40, bottom: 100 } }>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis 
                                                dataKey='question'
                                                angle={60}
                                                tick={ { fontSize: 10 } }
                                                tickLine={true}
                                                type='category'
                                                interval={0}
                                                textAnchor='start'
                                            />
                                            <YAxis />
                                            <Bar dataKey='points' fill={colors.highlightColor} barSize={20}>
                                                <LabelList dataKey='points' content={ customBarLabelList }/>
                                            </Bar>
                                            <Tooltip content={ customTooltip } cursor={ { fill: 'transparent' } }/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </>
                            ) }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default UsersAnalysis;