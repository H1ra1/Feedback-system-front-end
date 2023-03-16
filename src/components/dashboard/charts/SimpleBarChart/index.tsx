'use client'

import React from 'react';
import colors from '@/styles/colors.module.scss';
import { 
    Bar,
    BarChart,
    CartesianGrid, 
    LabelList, 
    ResponsiveContainer, 
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

interface SimplePieChartProps {
    chart_data: ChartData[]
}

interface ChartData {
    label: string
    value: number
}

function customTooltip( { active, payload, label }: any ) {
    if( active && payload && payload.length )
        return (
            <div className="default-custom-tooltip">
                <div className="default-custom-tooltip__header">
                    <p>{ payload[0].payload.label }</p>
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

export default function SimpleBarChart( props: SimplePieChartProps ) {
    return (
        <ResponsiveContainer width="100%" aspect={4/2}>
            <BarChart data={ props.chart_data } margin={ { top: 60, bottom: 130 } }>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis 
                    dataKey='label'
                    angle={60}
                    tick={ { fontSize: 10 } }
                    tickLine={true}
                    type='category'
                    interval={0}
                    textAnchor='start'
                />
                <YAxis />

                <Bar dataKey="value" fill={ colors.highlightColor } barSize={ 30 } isAnimationActive={ true }>
                    <LabelList dataKey='value' content={ customBarLabelList } position='top'/>
                </Bar>

                <Tooltip content={ customTooltip } cursor={ { fill: 'transparent' } }/>

            </BarChart>
        </ResponsiveContainer>
    )
}
