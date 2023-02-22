'use client'

import React, { useState } from 'react';
import colors from '@/styles/colors.module.scss';
import TinySimpleTable from '../../tables/TinySimpleTable';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    Bar,
    Tooltip
} from 'recharts';

function QuestionsAnalysis() {
    const [ questionsChartsData, setQuestionsChartsData ] = useState< any >( [] );

    const QUESTIONS_TABLE_HEAD = [
        {
            title: 'Perguntas'
        }
    ];

    const QUESTIONS_TABLE_BODY = [
        {
            row_type: 'select',
            items: [
                ( <p key={0}>Análise e soluções de problemas</p> )
            ]
        },
        {
            row_type: 'select',
            items: [
                ( <p key={0}>Busca de Excelência</p> )
            ]
        }
    ];

    function questionsListClickHandler( e: MouseEvent, user_index: number  ) {
    }

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

    return (
        <div className={`flex flex-gap-20`}>
            <div className={`col-xl col-xl-3`}>
                <TinySimpleTable head={QUESTIONS_TABLE_HEAD} body={QUESTIONS_TABLE_BODY} body_row_click_handler={ questionsListClickHandler } />
            </div>

            <div className={`col-xl col-xl-9 custom-purple-scrollbar`}>
                <div className={`flex flex-align-center flex-justify-between`}>
                    <h3 className={`f-22 f-c-highlight`}>None</h3>
                </div>

                <div className={`flex flex-align-center`}>
                    <ResponsiveContainer width='100%' height={450}>
                        <BarChart data={SELECTED_QUESTIONS_CHART_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey='points' fill={colors.highlightColor}>
                            </Bar>
                            <Tooltip />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default QuestionsAnalysis;