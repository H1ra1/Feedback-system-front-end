'use client'

import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './styles.module.scss';

interface SortFullTableProps {
    thead: THead[]
    tbody: TBodyRow[]
    footer?: boolean
    filter?: Function
}

interface THead {
    order: boolean
    item: string
}

interface TBodyRow {
    items:  TBodyRowItem[]
}

interface TBodyRowItem {
    type?: 'text'
    item: string | number | JSX.Element
}

function SortFullTable( props: SortFullTableProps ) {
    const [ tbodyItems, setTbodyItems ] = useState< TBodyRow[] >( [] );
    const [ sortedColumns, setSortedColumns ] = useState< any >( {} );

    useEffect( () => {
        function prepareTableBodyItems( tbody: TBodyRow[] ) {
            const ROWS = tbody;
        
            setTbodyItems( ROWS );
        }

        prepareTableBodyItems( props.tbody );
    }, [ props.tbody ] );

    function sortTable( indice: number ) {
        const ROWS = tbodyItems;
        let sorted_rows: any = [];
        let order = 'ASC';
        let footer: any;

        if( props.footer ) {
            let last_index = ROWS.length - 1;
            footer = ROWS[ last_index ];
            ROWS.splice( last_index, 1 );
        }

        if( sortedColumns[ indice ] == undefined || sortedColumns[ indice ].order == 'ASC' ) {
            sorted_rows = ROWS.sort( ( a, b ) => {
                if( a.items[ indice ].item > b.items[ indice ].item )
                    return -1;
    
                if( a.items[ indice ].item < b.items[ indice ].item )
                    return 1;
                return 0;
            } );

            order = 'DESC';
        } else {
            sorted_rows = ROWS.sort( ( a, b ) => {
                if( a.items[ indice ].item > b.items[ indice ].item )
                    return 1;

                if( a.items[ indice ].item < b.items[ indice ].item )
                    return -1;
                return 0;
            } );

            order = 'ASC';
        }
            

        setTbodyItems( [] );

        setSortedColumns( { ...sortedColumns, [ indice ]: { order } } );
        
        setTimeout(() => {
            sorted_rows.push( footer );
            setTbodyItems( sorted_rows );
        }, 50 );
    }

    function filterChange() {
        if( props.filter != undefined )
            props.filter( 'ok' );
    }

    return (
        <>
            { props.filter && ( 
                <div className={`${styles[ 'filters-holder' ]}`}>
                    <select name="filter-tag" id="filter-tag" onChange={ filterChange }>
                        <option value="2T23">2T23</option>
                        <option value="3T23">3T23</option>
                        <option value="4T23">4T23</option>
                    </select>
                </div>
            ) }

            <div className={`${styles[ 'sort-full-table-holder' ]} custom-purple-scrollbar`}>
                <table className={`${styles[ 'sort-full-table' ]}`}>
                    <thead>
                        <tr>
                            { props.thead && props.thead.map( ( thead, indice ) => (
                                <th key={ `thead-${indice}` } onClick={ () => thead.order ? sortTable( indice ) : false }>
                                    <div className={`${styles['sort-full-table-header-holder']} flex flex-align-center ${ thead.order && styles['--order' ] }`}>
                                        <p>{ thead.item }</p>
                                        { thead.order && 
                                            <div 
                                                className={`${styles['sort-full-table-order-holder']} flex flex-column`}
                                            >
                                                <IoMdArrowDropup />
                                                <IoMdArrowDropdown />
                                            </div>
                                        }
                                    </div>
                                </th>
                            ) ) }
                        </tr>
                    </thead>

                    <tbody>
                        { tbodyItems && tbodyItems.map( ( t_row, indice ) => {
                            if( indice + 1 >= tbodyItems.length && props.footer )
                                return (
                                    <tr key={ `trow-${indice}` } className={ `${styles[ 'sort-full-table-footer' ]}` }>
                                        { t_row.items && t_row.items.map( ( row_item, indice ) => (
                                            <td key={ `row-item-${indice}` }>{ row_item.item }</td>
                                        ) ) }
                                    </tr>
                                );

                            return (
                                <tr key={ `trow-${indice}` }>
                                    { t_row.items && t_row.items.map( ( row_item, indice ) => (
                                        <td key={ `row-item-${indice}` }>{ row_item.item }</td>
                                    ) ) }
                                </tr>
                            );
                        } ) }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SortFullTable;