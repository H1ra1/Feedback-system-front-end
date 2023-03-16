import React from 'react';
import TinySimpleTable from '../../tables/TinySimpleTable';
import SimplePieChart from '../../charts/SimplePieChart';

interface AveragePerAreaProps {
    data: {
        note_average: number
    }
}

const TABLE_HEADER_ITEMS = [
    {
        title: 'Área'
    },
    {
        title: 'Média'
    }
];

function AveragePerArea( props: AveragePerAreaProps ) {
    function formattedChartData() {
        const AREAS_FORMATTED: any = [];

        const DATA: any = props.data;
        DATA.areas.forEach( ( area: any ) => {
            AREAS_FORMATTED.push( {
                label: area.name,
                value: area.area_average_note
            } );
        } );

        return AREAS_FORMATTED;
    }

    function formattedTableBodyData() {
        const AREAS_FORMATTED: any = [];

        const DATA: any = props.data;
        DATA.areas.forEach( ( area: any, indice: number ) => {
            AREAS_FORMATTED.push( {
                row_type: 'simple',
                items: [
                    ( <p key={ indice }>{ area.name }</p> ),
                    ( <p key={ indice }>{ area.area_average_note }</p> )
                ]
            } );
        } );

        return AREAS_FORMATTED;
    }

    const AREAS_FORMATTED  = formattedChartData();
    const TABLE_BODY_ITEMS = formattedTableBodyData();

    return (
        <div className={ `flex flex-gap-10` } style={ { maxHeight: '100%' } }>
            <div className='col-xl-4'>
                <TinySimpleTable head={ TABLE_HEADER_ITEMS } body={ TABLE_BODY_ITEMS } footer={ `Média geral: ${ props.data.note_average }` } />
            </div>

            <div className='col-xl-8 flex flex-align-center'>
                <SimplePieChart chart_data={ AREAS_FORMATTED }/>
            </div>
        </div>
    )
}

export default AveragePerArea;
