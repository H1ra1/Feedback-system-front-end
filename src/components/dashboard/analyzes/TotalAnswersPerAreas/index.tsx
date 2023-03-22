import React from 'react';
import SimpleTable from '../../tables/SimpleTable';

interface TotalAnswersPerAreasProps {
    data: any
}

function formattedTableBodyData( props: TotalAnswersPerAreasProps ) {
    const TABLE_BODY_ITEMS: any = [];

    const DATA: any = props.data;
    DATA.areas.forEach( ( area: any, indice: number ) => {
        TABLE_BODY_ITEMS.push( {
            id:   area.id,
            items: [
                {
                    column_size: '40%',
                    item: area.name
                },
                {
                    column_size: '15%',
                    item: area.total_points
                }
            ]
        } );
    } );

    return TABLE_BODY_ITEMS;
}

function TotalAnswersPerAreas( props: TotalAnswersPerAreasProps ) {
    const TABLE_HEADER_ITEMS = [
        {
            order: true,
            item: 'Área',
            column_size: '50%'
        },
        {
            order: true,
            item: 'Avaliações recebidas'
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

export default TotalAnswersPerAreas;
