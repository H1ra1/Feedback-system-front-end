'use client'

import React, { useEffect, useState } from 'react';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import colors from '@/styles/colors.module.scss';
import { positionsDict } from '@/utils/general';
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
    Tooltip
} from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineSync } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa6';
import UserEditModal, { iUserToEdit } from '@/components/dashboard/users/UserEditModal';
import UserDisableModal, { iUserToDisable } from '@/components/dashboard/users/UserDisableModal';

function UsersListControl() {
    const [ loading, setLoading ]                       = useState< boolean >( true );
    const [ usersList, setUsersList ]                   = useState< any >( [] );
    const [ filteredUsers, setFilteredUsers ]           = useState< iUserToEdit >();
    const [ modalEditUserOpen, setModalEditUserOpen ]   = useState< boolean >( false );
    const [ userToEdit, setUserToEdit ]                 = useState< iUserToEdit >();
    const [ modalDisabledUser, setModalDisableUser ]    = useState< boolean >( false );
    const [ usertToDisable, setUsertToDisable ]         = useState< iUserToDisable >();

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
                <Input className='m-b-10' type="text" placeholder='Pesquisar usuário por nome' onChange={ filterUsers } />
                <TableContainer width='100%'>
                    <Table variant='striped' colorScheme='gray' overflow='scroll' size='md' layout='fixed'>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Departamento</Th>
                                <Th>Unidade</Th>
                                <Th>Posição</Th>
                                <Th>Ultimo acesso</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            { Array.isArray( filteredUsers ) && filteredUsers.length > 0 ? ( filteredUsers.map( ( userElement: any, index: number ) => (
                                <Tr key={ index }>
                                    <Td>{ userElement.name }</Td>
                                    <Td>{ userElement.department?.name }</Td>
                                    <Td>{ userElement.unit?.name }</Td>
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
                            ) ) ) : 'Nenhum usuário encontrado' }
                        </Tbody>
                    </Table>
                </TableContainer>

                <UserEditModal isModalOpen={ ( isOpen ) => { if( ! isOpen ) setModalEditUserOpen( false ); } } openModal={ modalEditUserOpen } userToEdit={ userToEdit } />
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