'use client'

import React, { useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdAnalytics, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import styles from './styles.module.scss';
import colors from '@/styles/colors.module.scss';
import SimpleModal from '../../modals/SimpleModal';
import UserToUserAnalysis from '../../analyzes/UserToUserAnalysis';

interface ModalAnalyticsSettings {
    title?: string
    icon?: JSX.Element
    type: 'user_to_user' | 'area'
    question_group_id: number
}

function AssessmentsGroupsTable() {
    const [ OPEN_MODAL, setOPEN_MODAL ] = useState< boolean >( false );
    const [ MODAL_TO_OPEN, setMODAL_TO_OPEN ] = useState< ModalAnalyticsSettings | null >();

    function openAnalyticsModal() {
        setMODAL_TO_OPEN( {
            title: `Grupo: Puxar nome do grupo`,
            icon: <MdAnalytics />,
            type: 'user_to_user',
            question_group_id: 1
        } )

        setOPEN_MODAL( true );
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
                                <p>Área</p>
                                
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
                                <p>Usuários</p>
                                
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
                                <p>Ações</p>
                                
                                <div className={`${styles['assessment-groups-table-order-holder']} flex flex-column`}>
                                    <IoMdArrowDropup/>
                                    <IoMdArrowDropdown />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className={`${styles['assessment-groups-table__body']}`}>
                    <tr>
                        <td>1</td>
                        <td>User Name</td>
                        <td>360</td>
                        <td>status</td>
                        <td>Progresso</td>
                        <td>users</td>
                        <td>data</td>
                        <td>data</td>
                        <td>
                            <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                <ButtonActionTiny 
                                    icon={<MdAnalytics />} 
                                    bgColor={colors.highlightColor} 
                                    tooltip="Teste tooltip"
                                    onClick={ () => openAnalyticsModal() }
                                />
                                <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>User Name</td>
                        <td>360</td>
                        <td>status</td>
                        <td>Progresso</td>
                        <td>users</td>
                        <td>data</td>
                        <td>data</td>
                        <td>
                            <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                <ButtonActionTiny icon={<MdAnalytics />} bgColor={colors.highlightColor} />
                                <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>User Name</td>
                        <td>360</td>
                        <td>status</td>
                        <td>Progresso</td>
                        <td>users</td>
                        <td>data</td>
                        <td>data</td>
                        <td>
                            <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                <ButtonActionTiny icon={<MdAnalytics />} bgColor={colors.highlightColor} />
                                <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>User Name</td>
                        <td>360</td>
                        <td>status</td>
                        <td>Progresso</td>
                        <td>users</td>
                        <td>data</td>
                        <td>data</td>
                        <td>
                            <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                <ButtonActionTiny icon={<MdAnalytics />} bgColor={colors.highlightColor} />
                                <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>1</td>
                        <td>User Name</td>
                        <td>360</td>
                        <td>status</td>
                        <td>Progresso</td>
                        <td>users</td>
                        <td>data</td>
                        <td>data</td>
                        <td>
                            <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                <ButtonActionTiny icon={<MdAnalytics />} bgColor={colors.highlightColor} />
                                <ButtonActionTiny icon={<MdModeEdit />} bgColor={colors.info} />
                                <ButtonActionTiny icon={<MdDeleteForever />} bgColor={colors.danger} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <SimpleModal 
                open_modal={OPEN_MODAL} 
                callback={ ( open ) => setOPEN_MODAL( open ) }
                title={ MODAL_TO_OPEN?.title }
                icon={ MODAL_TO_OPEN?.icon }
            >
                { ( MODAL_TO_OPEN != null && MODAL_TO_OPEN.type == 'user_to_user' ) && <UserToUserAnalysis /> }
                
            </SimpleModal>
        </>
    );
}

export default AssessmentsGroupsTable;