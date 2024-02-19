'use client'

import React, { useEffect, useState } from 'react';
import ButtonActionTiny from '@/components/dashboard/buttons/ButtonActionTiny';
import colors from '@/styles/colors.module.scss';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { MdDelete, MdEdit, MdOutlineSync } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa6';

function UsersListControl() {
    const [ loading, setLoading ] = useState< boolean >( true );
    const [ usersList, setUsersList ] = useState< any >( [] );

    useEffect( () => {
        async function getUsers() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/users/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            setUsersList( RESPONDE_PARSED.data );
            setLoading( false );
            console.log( RESPONDE_PARSED.data );
        }

        getUsers();
    }, [] );

    return (
        <TableContainer width='100%'>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    <Tr>
                        <Th>#FEEDBACK ID</Th>
                        <Th>Nome</Th>
                        <Th>E-mail</Th>
                        <Th>Departamento</Th>
                        <Th>Unidade</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    { usersList.map( ( userElement: any ) => (
                        <Tr>
                            <Td>{ userElement.feedback_id }</Td>
                            <Td>{ userElement.name }</Td>
                            <Td>{ userElement.email }</Td>
                            <Td>{ userElement.department }</Td>
                            <Td>{ userElement.unit }</Td>
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
                                />
                                <ButtonActionTiny 
                                    icon={<MdDelete />} 
                                    bgColor={colors.danger} 
                                    tooltip="Excluir usuário"
                                />
                            </Td>
                        </Tr>
                    ) ) }
                    
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UsersListControl;