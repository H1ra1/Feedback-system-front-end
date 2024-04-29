'use client';

import colors from '@/styles/colors.module.scss';
import { useEffect, useState } from "react";
import { Area, Bar, CartesianGrid, ComposedChart, LabelList, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AreaNoteHistoryProps {
  questionGroupID: number;
}

function AreaNoteHistory({ questionGroupID }: AreaNoteHistoryProps) {
  const [data, setData] = useState();

  const getAreaNoteHistory = async () => {
    const RESPONSE = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/analysis/area-note-history/${questionGroupID}/`);

    if (!RESPONSE.ok)
      throw new Error(RESPONSE.statusText);

    const areaNoteHistory = await RESPONSE.json();
    setData(areaNoteHistory.data);
  }

  const customBarLabelList = ({ x, y, width, value }: any) => {
    const radius = 20;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius - 5} r={radius} fill={colors.highlightColor} />
        <text x={x + width / 2} y={y - radius - 5} fill="#fff" textAnchor="middle" dominantBaseline="middle" fontSize={16}>
          {value}
        </text>
      </g>
    );
  }

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length)
      return (
        <div className="default-custom-tooltip">
          <div className="default-custom-tooltip__header">
            <p>{payload[0] && payload[0].payload.tag}</p>
          </div>

          <div className="default-custom-tooltip__content">
            <p className="label"><strong>Nota média:</strong> {payload[0] && payload[0].value}</p>
          </div>
        </div>
      );
  }

  useEffect(() => {
    getAreaNoteHistory();
  }, [])

  return (
    <section>
      <p style={{ textAlign: 'center' }}>Histórico de notas</p>
      <ResponsiveContainer aspect={3 / 1}>
        <ComposedChart
          data={data}
          margin={{
            top: 60,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tag" tick={{ fontSize: 14, fontWeight: 600 }} />
          <YAxis domain={[0, 5]} scale='sequential' />
          <Tooltip content={customTooltip} cursor={{ fill: 'transparent' }} />

          <Bar type="monotone" dataKey='average_note' barSize={30} isAnimationActive={false} fill={colors.highlightColor}>
            <LabelList dataKey='average_note' content={customBarLabelList} />
          </Bar>

          <Area type="monotone" dataKey="average_note" fill="#8884d8" stroke="#8884d8" />

          <Line type="monotone" dataKey="average_note" name="Nota média" stroke={colors.highlightColor} activeDot={{ r: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  )
}

export default AreaNoteHistory;