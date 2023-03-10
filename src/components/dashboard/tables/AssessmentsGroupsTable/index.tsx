'use client'

import React, { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdAnalytics, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import styles from './styles.module.scss';
import colors from '@/styles/colors.module.scss';
import SimpleModal from '../../modals/SimpleModal';
import UserToUserAnalysis from '../../analyzes/UserToUserAnalysis';
import GroupAnalysis from '../../analyzes/GroupAnalysis';
import SimpleProgressBar from '../../SimpleProgressBar';

interface ModalAnalyticsSettings {
    title?: string
    icon?: JSX.Element
    type: 'user_to_user' | 'area'
    question_group_id: number
}

interface Group {
    id: number
    name: string
    progress: number
    research_type: string
    status: string
    period_initial: string
    period_final: string
    user_to_user: boolean
}

interface AssessmentsGroupsTableProps {
    groups: Group[]
}

function AssessmentsGroupsTable( props: AssessmentsGroupsTableProps ) {
    const [ OPEN_MODAL, setOPEN_MODAL ] = useState< boolean >( false );
    const [ MODAL_TO_OPEN, setMODAL_TO_OPEN ] = useState< ModalAnalyticsSettings | null >();

    function openAnalyticsModal( group_id: number, group_name: string, user_to_user: boolean ) {
        setMODAL_TO_OPEN( {
            title: `Grupo: ${group_name}`,
            icon: <MdAnalytics />,
            type: user_to_user ? 'user_to_user' : 'area',
            question_group_id: group_id
        } )

        setOPEN_MODAL( true );
    }

    function getStatusName( status: string ) {
        const STATUS: any = {
            inpr: 'Em progresso',
        }

        return STATUS[ status ]
    }

    return (
        <>
            <table className={`${styles['assessment-groups-table']}`}>
                <thead className={`${styles['assessment-groups-table__head']}`}>
                    <tr>
                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>#ID</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>

                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Nome</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>
                        
                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>??rea</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>
                        
                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Status</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>
                        
                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Progresso</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>

                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Usu??rios</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>

                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Data de inicio</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>

                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>Data final</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>

                        <th className={`${styles['--order']}`}>
                            <div className={`${styles['assessment-groups-table-head-item-holder']} flex flex-align-center flex-justify-center`}>
                                <p>A????es</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className={`${styles['assessment-groups-table__body']}`}>
                    { props.groups && props.groups.map( group => (
                        <tr key={group.id}>
                            <td>{ group.id }</td>
                            <td>{ group.name }</td>
                            <td>{ group.research_type }</td>
                            <td>{ getStatusName( group.status ) }</td>
                            <td><SimpleProgressBar progress={ group.progress }/></td>
                            <td>users</td>
                            <td>{ group.period_initial }</td>
                            <td>{ group.period_final }</td>
                            <td>
                                <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                    <ButtonActionTiny 
                                        icon={<MdAnalytics />} 
                                        bgColor={colors.highlightColor} 
                                        tooltip="Abrir an??lises"
                                        onClick={ () => openAnalyticsModal( group.id, group.name, group.user_to_user ) }
                                    />
                                    <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                    <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                                </div>
                            </td>
                        </tr>
                    ) ) }
                </tbody>
            </table>

            <SimpleModal 
                open_modal={OPEN_MODAL} 
                callback={ ( open ) => setOPEN_MODAL( open ) }
                title={ MODAL_TO_OPEN?.title }
                icon={ MODAL_TO_OPEN?.icon }
            >
                { ( MODAL_TO_OPEN != null && MODAL_TO_OPEN.type == 'user_to_user' ) && <UserToUserAnalysis group_id={ MODAL_TO_OPEN.question_group_id }/> }
                { ( MODAL_TO_OPEN != null && MODAL_TO_OPEN.type == 'area' ) && <GroupAnalysis group_id={ MODAL_TO_OPEN.question_group_id }/> }
            </SimpleModal>
        </>
    );
}

export default AssessmentsGroupsTable;