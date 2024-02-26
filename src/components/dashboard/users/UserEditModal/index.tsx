'use client'

import React, { useEffect } from "react";
import colors from '@/styles/colors.module.scss';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Select
  } from '@chakra-ui/react';

interface iUserEditModalProps {
    isModalOpen : ( isOpen: any ) => void
    openModal   : boolean
}

function UserEditModal( props: iUserEditModalProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect( () => {
        props.isModalOpen( isOpen );

        if( props.openModal ) {
            onOpen();
        }

    }, [ props.isModalOpen, props.openModal ] );

    return (
        <Modal isOpen={isOpen} onClose={ onClose } size='2xl'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Editar usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex gap={ 5 } flexWrap='wrap'>
                    <FormControl flexGrow={1} w='auto'>
                        <FormLabel>Nome</FormLabel>
                        <Input type='text' placeholder="Nome" />
                    </FormControl>

                    <FormControl flexGrow={1} w='auto'>
                        <FormLabel>Sobrenome</FormLabel>
                        <Input type='text' placeholder="Sobrenome" />
                    </FormControl>
                    
                    <FormControl w='100%'>
                        <FormLabel>E-mail</FormLabel>
                        <Input type='email' placeholder="email@exemplo.com" />
                    </FormControl>

                    <FormControl flexGrow={1} w='auto'>
                        <FormLabel>Departamento</FormLabel>
                        <Select placeholder='Departamento'>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </Select>
                    </FormControl>

                    <FormControl flexGrow={1} w='auto'>
                        <FormLabel>Unidade</FormLabel>
                        <Select placeholder='Unidade'>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </Select>
                    </FormControl>
                </Flex>
            </ModalBody>

            <ModalFooter>
                <Button backgroundColor={ colors.highlightColor } color='#FFF'>Salvar</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserEditModal;