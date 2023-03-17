import React from 'react';
import SimpleTable from '../../tables/SimpleTable';

interface PointsPerUserAnalysisProps {
    data: any
}

function formattedTableBodyData( props: PointsPerUserAnalysisProps ) {
    const TABLE_BODY_ITEMS: any = [];

    const DATA: any = props.data;
    DATA.users.forEach( ( user: any, indice: number ) => {
        TABLE_BODY_ITEMS.push( {
            id:   user.id,
            items: [
                {
                    column_size: '40%',
                    item: user.name
                },
                {
                    column_size: '15%',
                    item: user.evaluations_done_count
                },
                {
                    column_size: '15%',
                    item: user.total_points
                }
            ]
        } );
    } );

    return TABLE_BODY_ITEMS;
}

function PointsPerUserAnalysis( props: PointsPerUserAnalysisProps ) {
    const TABLE_HEADER_ITEMS = [
        {
            order: true,
            item: 'Nome',
            column_size: '50%'
        },
        {
            order: true,
            item: 'Avaliações recebidas'
        },
        {
            order: true,
            item: 'Pontos'
        }
    ];
    const TABLE_BODY_ITEMS = formattedTableBodyData( props );

    return (
        <div className={`flex flex-gap-10`} style={ { maxHeight: '100%' } }>
            <div className={`col-xl-12`}>
                <SimpleTable thead={ TABLE_HEADER_ITEMS } tbody={ TABLE_BODY_ITEMS } footer={ `Pontuação total: ${props.data.total}` } />
            </div>
        </div>
    )
}

export default PointsPerUserAnalysis;