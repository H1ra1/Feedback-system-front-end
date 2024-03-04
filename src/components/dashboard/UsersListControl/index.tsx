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
    Skeleton
} from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineSync } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa6';
import UserEditModal, { iUserToEdit } from '@/components/dashboard/users/UserEditModal';
import { textTransform } from 'html2canvas/dist/types/css/property-descriptors/text-transform';
import SpinLoading from '../loadings/SpinLoading';

function UsersListControl() {
    const [ loading, setLoading ]                       = useState< boolean >( true );
    const [ usersList, setUsersList ]                   = useState< any >( [] );
    const [ modalEditUserOpen, setModalEditUserOpen ]   = useState< boolean >( false );
    const [ userToEdit, setUserToEdit ]                 = useState< iUserToEdit >();

    function editUser( user: any ) {
        setUserToEdit( {
            id          : user.ID,
            feedbackID  : user.feedback_id,
            firstName   : user.first_name,
            lastName    : user.last_name,
            email       : user.email,
            department  : user.department,
            unit        : user.unit,
            position    : user.position
        } )
        setModalEditUserOpen( true );
    }

    useEffect( () => {
        async function getUsers() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/users/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            setUsersList( RESPONDE_PARSED.data );
            setLoading( false );
        }

        getUsers();
    }, [] );

    return ! loading ? (
        <>
            <TableContainer width='100%'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>#FEEDBACK ID</Th>
                            <Th>Nome</Th>
                            <Th>E-mail</Th>
                            <Th>Departamento</Th>
                            <Th>Unidade</Th>
                            <Th>Posição</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        { usersList.map( ( userElement: any, index: number ) => (
                            <Tr key={ index }>
                                <Td>{ userElement.feedback_id }</Td>
                                <Td>{ userElement.name }</Td>
                                <Td>{ userElement.email }</Td>
                                <Td>{ userElement.department?.name }</Td>
                                <Td>{ userElement.unit?.name }</Td>
                                <Td>{ positionsDict( userElement.position ) }</Td>
                                <Td className='flex flex-gap-10'>
                                    <ButtonActionTiny 
                                        icon={ userElement.sync ? <FaUserCheck /> : <MdOutlineSync />} 
                                        bgColor={ userElement.sync ? colors.success : '#ccc' } 
                                        tooltip={ userElement.sync ? 'Usuário sincronizado' : 'Sincronizar usuário' } 
                                    />
                                    <ButtonActionTiny 
                                        icon={<MdEdit />} 
                                        bgColor={colors.info} 
                                        tooltip="Editar usuário"
                                        onClick={ () => editUser( userElement ) }
                                    />
                                    <ButtonActionTiny 
                                        icon={<MdDelete />} 
                                        bgColor='#ccc' 
                                        tooltip="Excluir usuário"
                                    />
                                </Td>
                            </Tr>
                        ) ) }
                        
                    </Tbody>
                </Table>
            </TableContainer>

            <UserEditModal isModalOpen={ ( isOpen ) => { if( ! isOpen ) setModalEditUserOpen( false ); } } openModal={ modalEditUserOpen } userToEdit={ userToEdit } />
        </>
    ) : <Stack width='100%'>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
}

export default UsersListControl;