'use client'

import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import FeederLoading from '../../loadings/FeederLoading';
import colors from '@/styles/colors.module.scss';

interface QuestionsAnalysisProps {
    group_id: number
}

function GroupAnalysisByQuestions( props: QuestionsAnalysisProps ) {
    const [ areaDataChart, setAreaDataChart ] = useState< any >( [] );
    const [ areaData, setAreaData ] = useState< any >( [] );
    const [ loading, setLoading ] = useState< boolean >( true );

    useEffect( () => {
        async function getQuestionGroupPerQuestionsAverage() {
            setLoading( true );
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/area/${props.group_id}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();
            const AREA_DATA: any[] = [];
            RESPONDE_PARSED.data.note_per_questions.forEach( ( area: any ) => {
                AREA_DATA.push( {
                    id: area.id,
                    question: area.alias,
                    points: area.note_average
                } );
            } );

            setAreaDataChart( AREA_DATA );
            setAreaData( RESPONDE_PARSED.data );
            setLoading( false );
        }

        getQuestionGroupPerQuestionsAverage();
    }, [ props.group_id ] );

    function customTooltip( { active, payload, label }: any ) {
        if( active && payload && payload.length )
            return (
                <div className="default-custom-tooltip">
                    <div className="default-custom-tooltip__header">
                        <p>{ payload[0] && payload[0].payload.question }</p>
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
                <div className={`col-xl col-xl-12 custom-purple-scrollbar`}>
                    <div>
                        <h3 className={`f-22 f-c-highlight`}>Nota média por pergunta</h3>
                        <p><strong>Nota média:</strong> { areaData.average_note }</p>
                        <p><strong>Avaliações recebidas:</strong> { areaData.evaluations_done_total }</p>
                    </div>
        
                    <div>
                        <ResponsiveContainer width="100%" aspect={4/1}>
                            <BarChart data={areaDataChart} margin={ { top: 60, bottom: 130 } }>
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
        
                                <Bar dataKey="points" fill={colors.highlightColor} barSize={30} isAnimationActive={ false }>
                                    <LabelList dataKey='points' content={ customBarLabelList } position='top'/>
                                </Bar>

                                <Tooltip content={ customTooltip } cursor={ { fill: 'transparent' } }/>

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            }
        </>
    )
}

export default GroupAnalysisByQuestions;