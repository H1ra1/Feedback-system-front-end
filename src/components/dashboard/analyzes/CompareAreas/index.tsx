'use client'

import React, { useEffect, useState } from 'react';
import SortFullTable from '@/components/dashboard/tables/SortFullTable';
import FeederLoading from '../../loadings/FeederLoading';
import styles from './styles.module.scss';

function CompareAreas() {
    const [ tableHeader, setTableHeader ] = useState( [] );
    const [ tableBody, setTableBody ]     = useState( [] );
    const [ loading, setLoading ]         = useState< boolean >( true );

    useEffect( () => {
        async function getAreasCompare() {
            setLoading( true );

            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/areas-compare-per-questions/1T23/` );
        
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

    async function filterByTag( tag: string ) {
        setLoading( true );

        const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/analysis/areas-compare-per-questions/${tag}/` );
    
        if( ! RESPONSE.ok )
            throw new Error( RESPONSE.statusText );
    
        const RESPONDE_PARSED = await RESPONSE.json();

        if( RESPONDE_PARSED.data ) {
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

            setTableBody( BODY );
            setLoading( false );
        }
    }

    return ( 
        <>
            <div className={`${styles[ 'filters-holder' ]}`}>
                <select name="filter-tag" id="filter-tag" onChange={ ( event ) => filterByTag( event.target.value ) }>
                    <option value="1T23">1T23</option>
                    <option value="2T23">2T23</option>
                    <option value="3T23">3T23</option>
                    <option value="4T23">4T23</option>
                </select>
            </div>

            { loading ? <FeederLoading /> : <SortFullTable thead={ tableHeader } tbody={ tableBody } footer={ true } /> }
        </>
    );
}

export default CompareAreas;