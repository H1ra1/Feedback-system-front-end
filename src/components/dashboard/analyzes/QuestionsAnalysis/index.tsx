'use client'

import React, { useEffect, useState } from 'react';
import colors from '@/styles/colors.module.scss';
import TinySimpleTable from '../../tables/TinySimpleTable';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    Bar,
    Tooltip,
    XAxis,
    YAxis,
    LabelList
} from 'recharts';
import FeederLoading from '../../loadings/FeederLoading';

interface QuestionsAnalysisProps {
    group_id: number
}

interface TinyTableBody {
    row_type: string
    row_pre_id: string
    items: any[]
}

function QuestionsAnalysis( props: QuestionsAnalysisProps ) {
    const [ questionsChartsData, setQuestionsChartsData ] = useState< any >( [] );
    const [ QUESTIONS_GROUP, setQUESTIONS_GROUP ] = useState< any[] >( [] );
    const [ QUESTIONS_TABLE_BODY, setQUESTIONS_TABLE_BODY ] = useState< TinyTableBody[] >( [] );
    const [ QUESTION_SELECTED, setQUESTION_SELECTED ] = useState< string >( 'Selecione uma pergunta para continuar.' );
    const [ loading, setLoading ] = useState< boolean >( true );

    useEffect( () => {
        async function getUsersAveragePerQuestions() {
            setLoading( true );
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/per-questions/${props.group_id}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            const ITEMS_QUESTIONS_TABLE:TinyTableBody[] = [];
            const QUESTIONS_GROUP_DATA: any[] = [];
            RESPONDE_PARSED.data.forEach( ( question: any ) => {
                QUESTIONS_GROUP_DATA.push( {
                    id: question.id,
                    alias: question.alias,
                    per_users: question.per_users
                } );

                ITEMS_QUESTIONS_TABLE.push( {
                    row_type: 'select',
                    row_pre_id: 'question',
                    items: [
                        ( <p key={0}>{ question.alias }</p> )
                    ]
                } );
            } );

            setQUESTIONS_GROUP( QUESTIONS_GROUP_DATA );
            setQUESTIONS_TABLE_BODY( ITEMS_QUESTIONS_TABLE );
            setLoading( false );
        }

        getUsersAveragePerQuestions();
    }, [ props.group_id ] );

    const QUESTIONS_TABLE_HEAD = [
        {
            title: 'Perguntas'
        }
    ];

    function questionsListClickHandler( e: MouseEvent, question_index: number  ) {
        const SELECTED_QUESTION = QUESTIONS_GROUP[ question_index ].alias;
        const SELECTED_QUESTIONS_CHART_DATA:any[] = [];

        QUESTIONS_GROUP[ question_index ].per_users.forEach( ( user: any ) => {
            SELECTED_QUESTIONS_CHART_DATA.push( {
                username: user.username,
                points: user.average
            } );
        } );

        setQUESTION_SELECTED( SELECTED_QUESTION );
        setQuestionsChartsData( SELECTED_QUESTIONS_CHART_DATA );
    }

    function customTooltip( { active, payload, label }: any ) {
        if( active && payload && payload.length )
            return (
                <div className="default-custom-tooltip">
                    <div className="default-custom-tooltip__header">
                        <p>{ payload[0] && payload[0].payload.username }</p>
                    </div>

                    <div className="default-custom-tooltip__content">
                        <p className="label"><strong>Nota média:</strong> { payload[0] && payload[0].value }</p>
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
                <div className={`flex flex-gap-20`}>
                    <div className={`col-xl col-xl-3`}>
                        <TinySimpleTable head={QUESTIONS_TABLE_HEAD} body={QUESTIONS_TABLE_BODY} body_row_click_handler={ questionsListClickHandler } />
                    </div>

                    <div className={`col-xl col-xl-9 custom-purple-scrollbar`}>
                        <div className={`flex flex-align-center flex-justify-between`}>
                            <h3 className={`f-22 f-c-highlight`}>{ QUESTION_SELECTED }</h3>
                        </div>

                        <div className={`flex flex-align-center m-t-20`}>
                            { questionsChartsData.length > 0 && (
                                <ResponsiveContainer width='100%' height={450}>
                                    <BarChart data={questionsChartsData} margin={ { top: 40, bottom: 130, right: 40 } }>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey='username'
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

                                        <Tooltip content={customTooltip}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) }
                            
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default QuestionsAnalysis;