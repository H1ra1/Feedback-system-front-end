'use client'

import React, { useEffect, useState } from 'react';
import SortFullTable from '@/components/dashboard/tables/SortFullTable';
import FeederLoading from '../../loadings/FeederLoading';

function CompareAreas() {
    const [ tableHeader, setTableHeader ] = useState( [] );
    const [ tableBody, setTableBody ]     = useState( [] );
    const [ loading, setLoading ]         = useState< boolean >( true );

    useEffect( () => {
        async function getAreasCompare() {
            setLoading( true );

            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/areas-compare-per-questions/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            if( RESPONDE_PARSED.data ) {
                const HEADER = RESPONDE_PARSED.data.header.map( ( header: any ) => {
                    return {
                        order: true,
                        item: header
                    }
                } );
                

                const BODY = RESPONDE_PARSED.data.body.map( ( body: any ) => {
                    const OBJ: any = {
                        items: []
                    }
                    body.forEach( ( value: any ) => {
                        OBJ.items.push( {
                            item: value
                        } );
                    } )

                    return OBJ;
                } );

                setTableHeader( HEADER );
                setTableBody( BODY );
                setLoading( false );
            }
        }

        getAreasCompare();
    }, [] );

    function filterByTag( tag: string ) {
        console.log( tag );
    }

    if( loading )
        return <FeederLoading />;

    return <SortFullTable thead={ tableHeader } tbody={ tableBody } footer={ true } filter={ filterByTag } />;
}

export default CompareAreas;