'use client'

import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styles from './styles.module.scss';

interface SimpleTableProps {
    thead: THead[]
    tbody: TBodyRow[]
    flex?: boolean
    footer?: string
}

interface THead {
    column_size?: string
    order: boolean
    item: string
}

interface TBodyRow {
    id:    number
    flex?: false
    items:  TBodyRowItem[]
}

interface TBodyRowItem {
    column_size?: string
    type?: 'text'
    item: string | number | JSX.Element
}

function SimpleTable( props: SimpleTableProps ) {
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
        const ROWS = props.tbody;
        let sorted_rows: any = [];
        let order = 'ASC';

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
            setTbodyItems( sorted_rows );
        }, 50 );
    }

    return (
        <div className={ `${styles['simple-table-container']} default-shadow` }>
            <table className={ `${styles['simple-table']}` }>
                <thead>
                    <tr className={ props.flex ? 'flex flex-align-center' : '' }>
                        { props.thead.map( ( thead_item, index ) => (
                            <th key={ index } style={ {
                                width: thead_item.column_size ?? '300px'
                            } }>
                                <div className={ `${styles['simple-table__thead_item']} flex flex-align-center ${ thead_item.order && styles['--order' ] }` } 
                                    onClick={ () => thead_item.order ? sortTable( index ) : false }
                                >
                                    <p>{ thead_item.item }</p>

                                    { thead_item.order && 
                                        <div 
                                            className={`${styles['simple-table-head-item-order-holder']} flex flex-column`}
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

                <tbody className={ `custom-purple-scrollbar` }>
                    { tbodyItems.map( ( row, row_index ) => (
                        <tr key={ row.id } className={ props.flex ? 'flex flex-align-center' : '' }>
                            { row.items.map( ( item, item_index ) => (
                                <td 
                                    key={ item_index } 
                                    style={ {
                                        width: item.column_size ?? '300px'
                                    } }
                                >
                                    { item.item }
                                </td>
                            ) ) }
                        </tr>
                    ) ) }
                </tbody>
            </table>
            
            { props.footer &&
                <div className={ `${styles['simple-table-container__footer']}` }>
                    <p>{ props.footer }</p>
                </div>
            }
        </div>
    )
}

export default SimpleTable;