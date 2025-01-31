'use client'

import React, { useEffect, useState } from "react";
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
    Select,
    useToast
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { positionsDict } from '@/utils/general';
import * as Yup from 'yup';

export interface iUserToEdit {
    vipID            : number;
    feedbackID      ?: number;
    advisorCode     ?: string;
    firstName        : string;
    lastName         : string;
    name             : string;
    email            : string;
    department      ?: {
        id           : number;
        name         : string;
    }
    unit            ?: {
        id           : number;
        name         : string;
    }
    position         : string;
    role            ?: string;
    lastLogin       ?: string;
}

interface iUserCreateModalProps {
    isModalOpen : ( isOpen: any ) => void
    openModal   : boolean
}

function UserCreateModal( props: iUserCreateModalProps ) {
    const toast                             = useToast();
    const { isOpen, onOpen, onClose }       = useDisclosure();
    const [ departments, setDepartments ]   = useState< Array< any > >( [] );
    const [ units, setUnits ]               = useState< Array< any > >( [] );

    const userEditSchema = Yup.object().shape( {
        firstName   : Yup.string().required( 'Preenchimento obrigatório!' ),
        lastName    : Yup.string().required( 'Preenchimento obrigatório!' ),
        email       : Yup.string().email( 'E-mail inválido' ).required( 'Preenchimento obrigatório!' )
    } );

    async function getDepartments() {
        const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/departments/` );
        
        if( ! RESPONSE.ok )
            throw new Error( RESPONSE.statusText );
    
        const RESPONDE_PARSED = await RESPONSE.json();

        setDepartments( RESPONDE_PARSED.data );
    }

    async function getUnits() {
        const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/units/` );
        
        if( ! RESPONSE.ok )
            throw new Error( RESPONSE.statusText );
    
        const RESPONDE_PARSED = await RESPONSE.json();

        setUnits( RESPONDE_PARSED.data );
    }

    function handleCreateUser( userObject: any ) {
        return new Promise( async ( resolve, reject ) => {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/users/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( userObject )
            } );
        
            if( ! RESPONSE.ok )
                return reject( await RESPONSE.json() );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            resolve( RESPONDE_PARSED );
        } );
    }

    useEffect( () => {
        getDepartments();
        getUnits();
    }, [] );

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
                <ModalHeader>Adicionar usuário</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={ {
                        advisorCode : '',
                        role        : 'assessor',
                        position    : 'leader',
                        department  : 1,
                        unit        : 1,
                    } }
                    validationSchema={ userEditSchema }
                    onSubmit={ ( values, actions ) => {
                        const SEND_OBJECT = {
                            ...values,
                            department  : departments.find( ( value ) => value.id == values.department ),
                            unit        : units.find( ( value ) => value.id == values.unit )
                        }

                        const createUser = handleCreateUser( SEND_OBJECT );

                        createUser.then( ( response ) => {
                            toast({
                                title: 'Succeso!',
                                description: 'Usuário criado com sucesso!',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                                position: 'bottom-right'
                            });
                            actions.setSubmitting( false );
                            onClose();
                        } ).catch( ( error ) => {
                            toast({
                                title: 'Erro.',
                                description: error.message,
                                status: 'error',
                                duration: 5000,
                                isClosable: true,
                                position: 'bottom-right'
                            });
                            actions.setSubmitting( false );
                        } );
                    } }
                >
                    { ( props ) => (
                        <Form>
                            <ModalBody>
                                <Flex gap={ 5 } flexWrap='wrap'>
                                    <Field name='firstName' type='text' placeholder='Nome'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto' isRequired isInvalid={ form.errors.firstName && form.touched.firstName }>
                                                <FormLabel>Nome</FormLabel>
                                                <Input { ...field } />
                                                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                            </FormControl>
                                        ) }
                                    </Field>
                                        
                                    <Field name='lastName' type='text' placeholder='Sobrenome'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto' isRequired isInvalid={ form.errors.lastName && form.touched.lastName }>
                                                <FormLabel>Sobrenome</FormLabel>
                                                <Input { ...field } />
                                                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                            </FormControl>
                                        ) }
                                    </Field>
                                    
                                    <Field name='email' type='email' placeholder='email@exemplo.com'>
                                        {({ field, form } : any ) => (
                                            <FormControl w='100%' isRequired isInvalid={ form.errors.email && form.touched.email }>
                                                <FormLabel>E-mail</FormLabel>
                                                <Input { ...field } />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        ) }
                                    </Field>

                                    <Field name='advisorCode' type='advisorCode' placeholder='Código do assessor'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto'>
                                                <FormLabel>Código do assessor</FormLabel>
                                                <Input { ...field } />
                                            </FormControl>
                                        ) }
                                    </Field>

                                    <Field name='role' type='select' placeholder='Função'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto'>
                                                <FormLabel>Função</FormLabel>
                                                <Select { ...field }>
                                                    <option value="assessor">Assessor</option>
                                                    <option value="administrator">Administrador</option>
                                                </Select>
                                            </FormControl>
                                        ) }
                                    </Field>
                                
                                    <Field name='department' type='select' placeholder='Departamento'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto'>
                                                <FormLabel>Departamento</FormLabel>
                                                <Select { ...field }>
                                                    { departments.map( ( department ) => (
                                                        <option key={ department.id } value={ department.id }>{ department.departament }</option>
                                                    ) ) }
                                                </Select>
                                            </FormControl>
                                        ) }
                                    </Field>

                                    <Field name='unit' type='select' placeholder='Unidade'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto'>
                                                <FormLabel>Unidade</FormLabel>
                                                <Select { ...field }>
                                                    { units.map( ( unit ) => (
                                                        <option key={ unit.id } value={ unit.id }>{ unit.name }</option>
                                                    ) ) }
                                                </Select>
                                            </FormControl>
                                        ) }
                                    </Field>
                                    
                                    <Field name='position' type='select' placeholder='Posição'>
                                        {({ field, form } : any ) => (
                                            <FormControl flexGrow={1} w='auto'>
                                                <FormLabel>Posição</FormLabel>
                                                <Select { ...field }>
                                                    <option value="leader">{ positionsDict( 'leader' ) }</option>
                                                    <option value="associate">{ positionsDict( 'associate' ) }</option>
                                                    <option value="partner">{ positionsDict( 'partner' ) }</option>
                                                </Select>
                                            </FormControl>
                                        ) }
                                    </Field>
                                </Flex>
                            </ModalBody>

                            <ModalFooter>
                                <Button 
                                    type='submit' 
                                    backgroundColor={ colors.highlightColor } 
                                    _hover={ { backgroundColor: colors.highlightColorMore } } 
                                    isLoading={ props.isSubmitting } 
                                    color='#FFF'
                                >
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </Form>
                    ) }
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default UserCreateModal;