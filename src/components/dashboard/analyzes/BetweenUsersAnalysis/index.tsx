"use client";

import React, { useEffect, useState } from "react";
import colors from "@/styles/colors.module.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  Tooltip,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

interface QuestionsAnalysisProps {
    group_id: number
}

function BetweenUsersAnalysis( props: QuestionsAnalysisProps ) {
    const [ averageByUsers, setAverageByUsers ] = useState< any >( [] );

    useEffect( () => {
        async function getUsersAverageComparative() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/questions-group/average/360/comparative/${props.group_id}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();
            const USERS_GROUP_DATA: any[] = [];
            RESPONDE_PARSED.data.forEach( ( user: any ) => {
                USERS_GROUP_DATA.push( {
                    id: user.user_evaluated_id,
                    username: user.user_evaluated_name,
                    points: user.note_average
                } );
            } );

            setAverageByUsers( USERS_GROUP_DATA );
        }

        getUsersAverageComparative();
    }, [ props.group_id ] );

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
        <div className={`col-xl col-xl-12 custom-purple-scrollbar`}>
            <div>
                <h3 className={`f-22 f-c-highlight`}>Nota média por usuário</h3>
            </div>

            <div>
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={averageByUsers} margin={ { top: 40, bottom: 130, right: 40 } }>
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

                        <Bar dataKey="points" fill={colors.highlightColor}>
                            <LabelList dataKey='points' content={ customBarLabelList }/>
                        </Bar>
                        <Tooltip content={ customTooltip }/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BetweenUsersAnalysis;
