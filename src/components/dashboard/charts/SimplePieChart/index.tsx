'use client'

import React, { useEffect } from 'react';
import colors from '@/styles/colors.module.scss';
import { 
    PieChart, 
    Pie, 
    Legend, 
    Tooltip, 
    ResponsiveContainer } 
from 'recharts';

interface SimplePieChartProps {
    chart_data: ChartData[]
}

interface ChartData {
    label: string
    value: number
}

function renderCustomLabel( { label }: any ) {
    return label;
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

function SimplePieChart( props: SimplePieChartProps ) {
    return (
        <ResponsiveContainer width="100%">
            <PieChart width={ 400 } height={ 400 }>
                <Pie
                    dataKey="value"
                    isAnimationActive={ true }
                    data={ props.chart_data }
                    cx="50%"
                    cy="50%"
                    outerRadius={ 80 }
                    fill={ colors.highlightColor }
                    label={ renderCustomLabel }
                />
                <Tooltip content={ customTooltip }/>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default SimplePieChart;
