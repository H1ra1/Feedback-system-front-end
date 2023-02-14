'use client'

import React, { useState } from 'react';
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

function UsersAnalysis() {
    const [ userSeleted, setUserSelected ] = useState< string >( 'None' );
    const [ questionsChartsData, setQuestionsChartsData ] = useState< any >( [] );

    const USERS_TABLE_HEAD = [
        {
            title: 'Usuários'
        },
        {
            title: 'Média'
        }
    ];

    const USERS_TABLE_BODY = [
        {
            row_type: 'select',
            row_pre_id: 'user', 
            items: [
                ( <p>Gabriel Câmara</p> ),
                ( <p>2,5</p> )
            ]
        },
        {
            row_type: 'select',
            row_pre_id: 'user',
            items: [
                ( <p>Leonargo Agnes</p> ),
                ( <p>2,5</p> )
            ]
        },
        {
            row_type: 'select',
            row_pre_id: 'user',
            items: [
                ( <p>Paulo Cunha</p> ),
                ( <p>2,5</p> )
            ]
        },
        {
            row_type: 'select',
            row_pre_id: 'user',
            items: [
                ( <p>Lucas Sharau</p> ),
                ( <p>2,5</p> )
            ]
        },{
            row_type: 'select',
            row_pre_id: 'user',
            items: [
                ( <p>Luan Nardi</p> ),
                ( <p>2,5</p> )
            ]
        },
        {
            row_type: 'select',
            row_pre_id: 'user',
            items: [
                ( <p>Ruan Nunes</p> ),
                ( <p>2,5</p> )
            ]
        }
        
    ];

    function usersListClickHandler( e: MouseEvent, user_index: number ) {
        const SELECTED_USERNAME = USERS_TABLE_BODY[ user_index ].items[ 0 ].props.children;
        const SELECTED_QUESTIONS_CHART_DATA = [
            {
              question: 'Math',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
            {
              question: 'Chinese',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
            {
              question: 'English',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
            {
              question: 'Geography',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
            {
              question: 'Physics',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
            {
              question: 'History',
              points: Math.floor( Math.random() * 5 ) + 1,
            },
        ];
        setUserSelected( SELECTED_USERNAME );
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
                        <p>Nota média: 4,89</p>
                    </div>
                </div>

                <div className={`${styles['users-analysis-chart-holder']} flex flex-column flex-justify-center flex-align-center flex-gap-20`}>
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
                </div>
            </div>
        </div>
    );
}

export default UsersAnalysis;