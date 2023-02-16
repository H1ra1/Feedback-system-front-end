import React, { MouseEventHandler } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import styles from './styles.module.scss';
import CheckboxSimple from '../../inputs/CheckboxSimple';

interface TableHeaderItem {
    title: string
}

interface TableBodyRows {
    row_id?: string
    row_pre_id?: string
    row_type?: string
    items: string[] | JSX.Element[]
}

interface TinySimpleTableProps {
    head: TableHeaderItem[]
    body: TableBodyRows[]
    table_name?: string
    body_row_click_handler?: Function
}

function TinySimpleTable( props: TinySimpleTableProps ) {
    return (
        <div className={`${styles['tiny-simple-table']} default-shadow`}>
            <div className={`${styles['tiny-simple-table__head']}`}>
                <div className={`${styles['tiny-simple-table-row']} flex flex-align-center flex-justify-between`}>
                    { props.head && props.head.map( ( head_item, head_index ) => (
                        <div className={`${styles['tiny-simple-table-col']} ${styles['tiny-simple-table-col--order']}`} key={head_index}>
                            <div className={`${styles['tiny-simple-table-head-item-holder']} flex flex-align-center`}>
                                <p>{head_item.title}</p>

                                <div className={`${styles['tiny-simple-table-head-item-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup />
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </div>
                    ) ) }
                </div>
            </div>
            
            <div className={`${styles['tiny-simple-table__body']} custom-purple-scrollbar`}>
                { props.body && props.body.map( ( row, row_index ) => {
                    const ROW_DEFAULT_ID = row.row_pre_id ? `${row.row_pre_id}-tiny-simple-table-select-row-${row_index}` : `tiny-simple-table-select-row-${row_index}`;
                    const ROW_ID = row.row_id ? row.row_id : ROW_DEFAULT_ID;

                    if( row.row_type == 'select')
                        return (
                            <label 
                                className={`${styles['tiny-simple-table-row']} flex flex-align-center flex-justify-between`} 
                                htmlFor={`${ROW_ID}}`} 
                                key={row_index}
                                onChange={ ( e ) =>  props.body_row_click_handler && props.body_row_click_handler( e , row_index ) }
                            >
                                
                                { row.items.map( ( item, indice ) => (
                                    indice == 0 ?
                                        <div className={`${styles['tiny-simple-table-col']} flex flex-align-center flex-gap-5`} key={indice}>
                                            <CheckboxSimple 
                                                id={`${ROW_ID}}`} 
                                                name={props.table_name ? props.table_name : 'tiny-simple-table-select-row'} 
                                                type='radio' 
                                            />
                                            {item}
                                        </div>
                                    :
                                        <div className={`${styles['tiny-simple-table-col']} flex flex-align-center`} key={indice}>
                                            {item}
                                        </div>
                                ) ) }

                            </label>
                        )

                    if( row.row_type == 'simple' )
                        return (
                            <div 
                                className={`${styles['tiny-simple-table-row']} flex flex-align-center flex-justify-between`} 
                                key={row_index}>
                                { row.items.map( ( item, row_indice ) => (
                                    <div className={`${styles['tiny-simple-table-col']} flex flex-align-center`} key={row_indice}>
                                        {item}
                                    </div>
                                ) ) }
                            </div>
                        )
                } ) }
            </div>
        </div>
    )
}

export default TinySimpleTable;