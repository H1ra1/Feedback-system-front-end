import React from 'react';
import SimpleBarChart from '../../charts/SimpleBarChart';

interface PointsPerAreasProps {
    data: {
        note_average: number,
        areas: Area[]
    } 
}

interface Area {
    id: number
    name: string
    area_average_note: number
    total_points: number
    evaluations_done_count: number
}

function formattedChartData( props: any ) {
    const  QUESTIONS_FORMATTED: any = [];
    const DATA: any = props.data;

    DATA.areas.forEach( ( area: Area ) => {
        QUESTIONS_FORMATTED.push( {
            label: area.name,
            value: area.total_points
        } );
    } );

    return QUESTIONS_FORMATTED;
}

function PointsPerAreas( props: PointsPerAreasProps ) {
    const POINTS_PER_AREAS = formattedChartData( props )

    return (
        <div className=''>
            <SimpleBarChart chart_data={ POINTS_PER_AREAS } chart_aspect={ 1.2 } />
        </div>
    )
}

export default PointsPerAreas;