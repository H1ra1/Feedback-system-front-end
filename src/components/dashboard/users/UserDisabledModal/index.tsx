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

export interface iUserToDisabled {
    feedbackID  : number;
    vipID       : number;
    name        : string;
}

interface iUserDisabledModalProps {
    isModalOpen     : ( isOpen: any ) => void;
    openModal       : boolean;
    userToDisabled ?: iUserToDisabled
}

function UserDisabledModal( props: iUserDisabledModalProps ) {
    const { isOpen, onOpen, onClose }           = useDisclosure();
    const [ userToDisabled, setUserToDisabled ] = useState< iUserToDisabled >();
    const [ loading, setLoading ]               = useState< boolean >( false );

    function disabledUser( action: string ) {

    }

    useEffect( () => {
        props.isModalOpen( isOpen );

        if( props.openModal ) {
            setUserToDisabled( props.userToDisabled );

            onOpen();
        }
    }, [ props.isModalOpen, props.openModal ] );

    return (
        <Modal isOpen={isOpen} onClose={ onClose } size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Desativar usuário - { userToDisabled?.name }</ModalHeader>
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

export default UserDisabledModal;
