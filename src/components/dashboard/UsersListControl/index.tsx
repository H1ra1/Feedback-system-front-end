'use client'

import React, { useEffect, useState } from 'react';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import colors from '@/styles/colors.module.scss';
import { positionsDict, toTimestamp } from '@/utils/general';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Stack,
    Skeleton,
    Box,
    Input,
    Tooltip,
    Button
} from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineSync } from 'react-icons/md';
import { FaSort, FaUserCheck } from 'react-icons/fa6';
import UserEditModal, { iUserToEdit } from '@/components/dashboard/users/UserEditModal';
import UserDisableModal, { iUserToDisable } from '@/components/dashboard/users/UserDisableModal';
import UserCreateModal from '../users/UserCreateModal';

function UsersListControl() {
    const [ loading, setLoading ]                           = useState< boolean >( true );
    const [ usersList, setUsersList ]                       = useState< any >( [] );
    const [ filteredUsers, setFilteredUsers ]               = useState< iUserToEdit | Array< any > >();
    const [ modalEditUserOpen, setModalEditUserOpen ]       = useState< boolean >( false );
    const [ modalCreateUserOpen, setModalCreateUserOpen ]   = useState< boolean >( false );
    const [ userToEdit, setUserToEdit ]                     = useState< iUserToEdit >();
    const [ modalDisabledUser, setModalDisableUser ]        = useState< boolean >( false );
    const [ usertToDisable, setUsertToDisable ]             = useState< iUserToDisable >();
    const [ tableOrder, setTableOrder ]                     = useState< any >( {} );

    function editUser( user: any ) {
        setUserToEdit( {
            vipID       : user.vip_id,
            feedbackID  : user.feedback_id,
            advisorCode : user.advisor_code,
            firstName   : user.first_name,
            lastName    : user.last_name,
            name        : user.name,
            email       : user.email,
            department  : user.department,
            unit        : user.unit,
            position    : user.position,
            role        : user.role
        } );

        setModalEditUserOpen( true );
    }

    function disableUser( user: any ) {
        setUsertToDisable( {
            vipID       : user.vip_id,
            feedbackID  : user.feedback_id,
            name        : user.name
        } );

        setModalDisableUser( true );
    }

    function filterUsers( event: React.ChangeEvent<HTMLInputElement> ) {
        const filterUserList = usersList.filter( ( user: iUserToEdit ) => user.name.toLowerCase().includes( event.target.value.toLowerCase() ) );

        setFilteredUsers( filterUserList );
    }

    function sortUsers( key: string ) {
        if( ! filteredUsers || ! Array.isArray( filteredUsers ) )
            return;

        let sortedRows;
        let order;

        if( tableOrder[ key ] == undefined || tableOrder[ key ].order == 'ASC') {
            sortedRows = filteredUsers.sort( ( a, b ) => {
                let aFormatted = a[ key ];
                let bFormatted = b[ key ];
                
                if( key == 'department' || key == 'unit' ) {
                    aFormatted = a[ key ] == undefined ? '~' : a[ key ][ 'name' ];
                    bFormatted = b[ key ] == undefined ? '~' : b[ key ][ 'name' ];
                }

                if( key == 'last_login' ) {
                    aFormatted = toTimestamp( a[ key ] );
                    bFormatted = toTimestamp( b[ key ] );
                }
                
                aFormatted = aFormatted == undefined ? '~' : aFormatted;
                bFormatted = bFormatted == undefined ? '~' : bFormatted;

                if( key != 'last_login' ) {
                    aFormatted = aFormatted.toLowerCase();
                    bFormatted = bFormatted.toLowerCase();
                }

                if( aFormatted < bFormatted )
                    return -1;
        
                if( aFormatted > bFormatted )
                    return 1;
    
                return 0;
            } );

            order = 'DESC';
        } else {
            sortedRows = filteredUsers.sort( ( a, b ) => {
                let aFormatted = a[ key ];
                let bFormatted = b[ key ];
                
                if( key == 'department' || key == 'unit' ) {
                    aFormatted = a[ key ] == undefined ? '~' : a[ key ][ 'name' ];
                    bFormatted = b[ key ] == undefined ? '~' : b[ key ][ 'name' ];
                }

                if( key == 'last_login' ) {
                    aFormatted = toTimestamp( a[ key ] );
                    bFormatted = toTimestamp( b[ key ] );
                }
                
                aFormatted = aFormatted == undefined ? '~' : aFormatted;
                bFormatted = bFormatted == undefined ? '~' : bFormatted;

                if( key != 'last_login' ) {
                    aFormatted = aFormatted.toLowerCase();
                    bFormatted = bFormatted.toLowerCase();
                }

                if( aFormatted > bFormatted )
                    return -1;
        
                if( aFormatted < bFormatted )
                    return 1;
    
                return 0;
            } );

            order = 'ASC';
        }
        

        setFilteredUsers( [ ...sortedRows ] );
        setTableOrder( { ...tableOrder, [ key ]: { order } } );
    }

    useEffect( () => {
        async function getUsers() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/users/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            setUsersList( RESPONDE_PARSED.data );
            setFilteredUsers( RESPONDE_PARSED.data );
            setLoading( false );
        }

        getUsers();
    }, [] );

    return ! loading ? (
        <>
            <Box width='100%'>
                <Box display='flex' gap={ 10 }>
                    <Input className='m-b-10' type="text" placeholder='Pesquisar usuário por nome' onChange={ filterUsers } />
                    <Button 
                        backgroundColor={ colors.highlightColor } 
                        _hover={ { backgroundColor: colors.highlightColorMore } }
                        color='#FFF'
                        onClick={ _ => setModalCreateUserOpen( true ) }
                    >
                        Adicionar usuário
                    </Button>
                </Box>
                { Array.isArray( filteredUsers ) && filteredUsers.length > 0 ? ( 
                    <TableContainer width='100%'>
                        <Table variant='striped' colorScheme='gray' overflow='scroll' size='md' layout='fixed'>
                            <Thead>
                                <Tr>
                                    <Th onClick={ _ => sortUsers( 'name' ) } style={ { cursor: 'pointer' } }><span className='flex flex-align-center flex-gap-5'>Nome <FaSort /></span></Th>
                                    <Th onClick={ _ => sortUsers( 'department' ) } style={ { cursor: 'pointer' } }><span className='flex flex-align-center flex-gap-5'>Departamento <FaSort /></span></Th>
                                    <Th onClick={ _ => sortUsers( 'unit' ) } style={ { cursor: 'pointer' } }><span className='flex flex-align-center flex-gap-5'>Unidade <FaSort /></span></Th>
                                    <Th onClick={ _ => sortUsers( 'position' ) } style={ { cursor: 'pointer' } }><span className='flex flex-align-center flex-gap-5'>Posição <FaSort /></span></Th>
                                    <Th onClick={ _ => sortUsers( 'last_login' ) } style={ { cursor: 'pointer' } }><span className='flex flex-align-center flex-gap-5'>Ultimo acesso <FaSort /></span></Th>
                                    <Th>Ações</Th>
                                </Tr>
                            </Thead>
                                    <Tbody>
                                        { filteredUsers.map( ( userElement: any, index: number ) => 
                                            <Tr key={ index }>
                                                <Td>{ userElement.name }</Td>
                                                <Td>{ userElement.department?.name == undefined ? '~' : userElement.department?.name }</Td>
                                                <Td>{ userElement.unit?.name == undefined ? '~' : userElement.unit?.name }</Td>
                                                <Td>{ positionsDict( userElement.position ) }</Td>
                                                <Td overflow='hidden' textOverflow='ellipsis'><Tooltip label={ userElement?.last_login } placement='top'>{ userElement?.last_login }</Tooltip></Td>
                                                <Td className='flex flex-gap-10'>
                                                    <ButtonActionTiny 
                                                        icon={ userElement.sync ? <FaUserCheck /> : <MdOutlineSync />} 
                                                        bgColor={ userElement.sync ? colors.success : '#ccc' } 
                                                        tooltip={ userElement.sync ? 'Usuário sincronizado' : 'Sincronizar usuário' } 
                                                    />
                                                    <ButtonActionTiny 
                                                        icon={<MdEdit />} 
                                                        bgColor={ colors.info } 
                                                        tooltip="Editar usuário"
                                                        onClick={ () => editUser( userElement ) }
                                                    />
                                                    <ButtonActionTiny 
                                                        icon={<MdDelete />} 
                                                        bgColor={ colors.danger } 
                                                        tooltip="Desativar usuário"
                                                        onClick={ () => disableUser( userElement ) }
                                                    />
                                                </Td>
                                            </Tr>
                                        ) } 
                                    </Tbody>
                        </Table>
                    </TableContainer>
                ) : 'Nenhum usuário encontrado' }

                <UserEditModal isModalOpen={ ( isOpen ) => { if( ! isOpen ) setModalEditUserOpen( false ); } } openModal={ modalEditUserOpen } userToEdit={ userToEdit } />
                <UserCreateModal isModalOpen={ ( isOpen ) => { if( ! isOpen ) setModalCreateUserOpen( false ); } } openModal={ modalCreateUserOpen } />
                <UserDisableModal isModalOpen={ ( isOpen ) => { if( ! isOpen ) setModalDisableUser( false ); } } openModal={ modalDisabledUser } userToDisable={ usertToDisable } />
            </Box>
        </>
    ) : <Stack width='100%'>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
}

export default UsersListControl;