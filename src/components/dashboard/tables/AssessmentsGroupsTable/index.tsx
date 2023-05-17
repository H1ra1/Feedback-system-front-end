'use client'

import React, { use, useEffect, useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdAnalytics, MdModeEdit, MdDeleteForever } from 'react-icons/md';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import styles from './styles.module.scss';
import colors from '@/styles/colors.module.scss';
import SimpleModal from '../../modals/SimpleModal';
import UserToUserAnalysis from '../../analyzes/UserToUserAnalysis';
import GroupAnalysis from '../../analyzes/GroupAnalysis';
import SimpleProgressBar from '../../SimpleProgressBar';
import { useSession } from 'next-auth/react';
import FeederLoading from '../../loadings/FeederLoading';
import Tippy from '@tippyjs/react';

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
    progress_info: string
    research_type: string
    status: string
    period_initial: string
    period_final: string
    user_to_user: boolean
    users_to_answer: []
}

function AssessmentsGroupsTable() {
    const { data: session, status }             = useSession( {
        required: true
    } );
    const [ OPEN_MODAL, setOPEN_MODAL ]         = useState< boolean >( false );
    const [ MODAL_TO_OPEN, setMODAL_TO_OPEN ]   = useState< ModalAnalyticsSettings | null >();
    const [ groups, setGroups ]                 = useState< Group[] >();
    const [ loading, setLoading ]               = useState< boolean >( true );
    
    useEffect( () => {
        async function getAssessmentsGroups() {
            if( session && session.user?.data ) {
                const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/questions-group/company/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session?.user.data.access_token}`
                    }
                } );
            
                if( ! RESPONSE.ok )
                    throw new Error('Failed to fetch data');
                
                const RESPONDE_PARSED = await RESPONSE.json();
            
                setGroups( RESPONDE_PARSED.data );
                setLoading( false );
            }
        }

        getAssessmentsGroups();        
    }, [ session ] );
    

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
            expi: 'Finalizado',
            done: 'Finalizado'
        }

        return STATUS[ status ]
    }

    if( loading )
        return <FeederLoading />;

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
                    { groups && groups.map( group => (
                        <tr key={group.id}>
                            <td>{ group.id }</td>
                            <td>{ group.name }</td>
                            <td>{ group.research_type }</td>
                            <td>{ getStatusName( group.status ) }</td>
                            <td><SimpleProgressBar progress={ group.progress } tooltip={ group.progress_info }/></td>
                            <td>
                                <div className={`${styles['assessment-groups-table-users']} flex flex-align-center flex-justify-center`}>
                                    { group.users_to_answer.map( ( user: any, indice: number ) => {
                                        if( indice > 4 )
                                            return;

                                        if( indice <= 3 )
                                            return (
                                                <Tippy content={ `${user.first_name} ${user.last_name}` }>
                                                    <div className={`${styles['assessment-groups-table-user-icon']} flex flex-align-center flex-justify-center`}>
                                                        <span>{ user.abbreviation }</span>
                                                    </div>
                                                </Tippy>
                                            );
                                        
                                        return '...';
                                    } ) }
                                </div>
                            </td>
                            <td>{ group.period_initial }</td>
                            <td>{ group.period_final }</td>
                            <td>
                                <div className='flex flex-align-center flex-justify-center flex-gap-10'>
                                    <ButtonActionTiny 
                                        icon={<MdAnalytics />} 
                                        bgColor={colors.highlightColor} 
                                        tooltip="Abrir análises"
                                        onClick={ () => openAnalyticsModal( group.id, group.name, group.user_to_user ) }
                                    />
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