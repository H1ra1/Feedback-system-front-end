import React, { useEffect, useState } from "react";
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    useDisclosure, 
    ModalBody,
    Box,
    Button
} from "@chakra-ui/react";

export interface iUserToDisable {
    feedbackID  : number;
    vipID       : number;
    name        : string;
}

interface iUserDisabledModalProps {
    isModalOpen     : ( isOpen: any ) => void;
    openModal       : boolean;
    userToDisable  ?: iUserToDisable
}

function UserDisableModal( props: iUserDisabledModalProps ) {
    const { isOpen, onOpen, onClose }           = useDisclosure();
    const [ userToDisable, setUserToDisable ]   = useState< iUserToDisable >();
    const [ loading, setLoading ]               = useState< boolean >( false );

    async function disabledUser( action: string ) {
        setLoading( true );

        const userToDisableObject = {
            ...userToDisable,
            action
        }

        const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/users/${userToDisableObject?.feedbackID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( userToDisableObject )
        } );
    
        if( ! RESPONSE.ok )
            throw new Error( RESPONSE.statusText );
    
        const RESPONDE_PARSED = await RESPONSE.json();

        console.log( RESPONDE_PARSED )
    }

    useEffect( () => {
        props.isModalOpen( isOpen );

        if( props.openModal ) {
            setUserToDisable( props.userToDisable );

            onOpen();
        }
    }, [ props.isModalOpen, props.openModal ] );

    return (
        <Modal isOpen={isOpen} onClose={ onClose } size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Desativar usuário - { userToDisable?.name }</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    { ! loading ? (
                        <Box display='flex' flexDirection='column' gap={ 2 } padding='10px 0'>
                            <Button colorScheme='orange' onClick={ () => disabledUser( 'client' ) }>Tornar cliente</Button>
                            <Button colorScheme='red' onClick={ () => disabledUser( 'block' ) }>Bloquear</Button>
                        </Box>
                    ) : 'Carregando...' }
                    
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UserDisableModal;
