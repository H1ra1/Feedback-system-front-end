import React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdAnalytics, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import styles from './styles.module.scss';
import colors from '@/styles/colors.module.scss';

function AssessmentsGroupsTable() {
    return (
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
    )
}

export default AssessmentsGroupsTable;