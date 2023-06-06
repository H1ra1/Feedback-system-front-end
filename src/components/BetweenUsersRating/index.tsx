'use client'

import React from 'react';
import BulletRating from '../BulletRating';
import styles from './styles.module.scss';
import colors from "@/styles/colors.module.scss";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
  } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

function BetweenUsersRating() {
    const { 
        isOpen: isOpenDialog, 
        onOpen: onOpenDialog, 
        onClose: onCloseDialog 
    } = useDisclosure();
    const { 
        isOpen: isOpenModal, 
        onOpen: onOpenModal, 
        onClose: onCloseModal 
    } = useDisclosure();
    const cancelRef = React.useRef( null );
    const TABLE_HEADER = [
        {
            item: '#'
        },
        {
            item: 'Nome'
        },
        {
            item: 'Agilidade Respostas'
        },
        {
            item: 'Sinergia entre equipe'
        },
        {
            item: 'Campanhas e planos regulares'
        },
        {
            item: 'Qualidade Técnica'
        },
        {
            item: 'Clareza nas estratégias'
        },
        {
            item: 'Eficiencia nas soluções'
        },
        {
            item: 'Follow up junto a clientes e AAIs'
        },
        {
            item: 'É considerada essencial'
        },
        {
            item: 'Pontos fortes e fracos'
        }
    ];
    const TABLE_BODY = [
        {

            items: [
                {
                    item: 'remove'
                },
                {
                    item: 'name',
                    value: 'NEY FUKUY KATAYAMA'
                },
                {
                    id: 1,
                    item: 'radio'
                },
                {
                    id: 2,
                    item: 'radio'
                },
                {
                    id: 3,
                    item: 'radio'
                },
                {
                    id: 4,
                    item: 'radio'
                },
                {
                    id: 5,
                    item: 'radio'
                },
                {
                    id: 6,
                    item: 'radio'
                },
                {
                    id: 7,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'points'
                },
            ]
        },
        {
            items: [
                {
                    item: 'remove'
                },
                {
                    item: 'name',
                    value: 'ANDERSON ANTUNES PEREIRA'
                },
                {
                    id: 1,
                    item: 'radio'
                },
                {
                    id: 2,
                    item: 'radio'
                },
                {
                    id: 3,
                    item: 'radio'
                },
                {
                    id: 4,
                    item: 'radio'
                },
                {
                    id: 5,
                    item: 'radio'
                },
                {
                    id: 6,
                    item: 'radio'
                },
                {
                    id: 7,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'points'
                },
            ]
        },
        {
            items: [
                {
                    item: 'remove'
                },
                {
                    item: 'name',
                    value: 'DANIEL VIEIRA FUNABASHI'
                },
                {
                    id: 1,
                    item: 'radio'
                },
                {
                    id: 2,
                    item: 'radio'
                },
                {
                    id: 3,
                    item: 'radio'
                },
                {
                    id: 4,
                    item: 'radio'
                },
                {
                    id: 5,
                    item: 'radio'
                },
                {
                    id: 6,
                    item: 'radio'
                },
                {
                    id: 7,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'points'
                },
            ]
        },
        {
            items: [
                {
                    item: 'remove'
                },
                {
                    item: 'name',
                    value: 'GUILHERME BOARI'
                },
                {
                    id: 1,
                    item: 'radio'
                },
                {
                    id: 2,
                    item: 'radio'
                },
                {
                    id: 3,
                    item: 'radio'
                },
                {
                    id: 4,
                    item: 'radio'
                },
                {
                    id: 5,
                    item: 'radio'
                },
                {
                    id: 6,
                    item: 'radio'
                },
                {
                    id: 7,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'points'
                },
            ]
        },
        {
            items: [
                {
                    item: 'remove'
                },
                {
                    item: 'name',
                    value: 'TATIANA TRIBIOLLI MOREIRA'
                },
                {
                    id: 1,
                    item: 'radio'
                },
                {
                    id: 2,
                    item: 'radio'
                },
                {
                    id: 3,
                    item: 'radio'
                },
                {
                    id: 4,
                    item: 'radio'
                },
                {
                    id: 5,
                    item: 'radio'
                },
                {
                    id: 6,
                    item: 'radio'
                },
                {
                    id: 7,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'radio'
                },
                {
                    id: 8,
                    item: 'points'
                },
            ]
        },
    ];

    return (
        <div className={`${styles[ 'between-users-rating' ]} flex flex-justify-center`}>
            <div className={`${styles[ 'between-users-rating__container' ]}`}>
                <table>
                    <thead>
                        <tr>
                            { TABLE_HEADER.map( ( header, index ) => (
                                <th key={`header-${index}`}>{header.item}</th>
                            ) ) }
                        </tr>
                    </thead>

                    <tbody>
                        { TABLE_BODY.map( ( tr, index ) => (
                            <tr key={index}>
                                { tr.items.map( ( body, index ) => (
                                    <td key={index}>
                                        {body.item == 'remove' && ( <Button colorScheme={'red'} fontSize={24} onClick={onOpenDialog}><MdClose /></Button>)}

                                        {body.item == 'name' && ( body.value )}

                                        {body.item == 'radio' && ( <BulletRating id={body.id ? body.id : index}/> )}

                                        {body.item == 'points' && ( <Button onClick={onOpenModal}>Responder</Button> )}
                                    </td>
                                ) ) }
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>

            {/* Modal answer text */}
            <Modal isOpen={isOpenModal} onClose={onCloseModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pontos fortes e fracos</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <Accordion defaultIndex={[0, 1]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' fontWeight={600}>Pontos fortes</Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <Textarea placeholder='Escreva aqui os pontos fortes' _focus={ { borderColor: colors.highlightColor } }/>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' fontWeight={600}>Pontos fracos</Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <Textarea placeholder='Escreva aqui os pontos fracos' _focus={ { borderColor: colors.highlightColor } }/>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            backgroundColor={colors.highlightColor}
                            color={colors.baseLight}
                            _hover={ {
                                background: colors.baseDark
                            } }
                        >Confirmar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>                  
            
            {/* Dialog cancel rating */}
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onCloseDialog}
                isOpen={isOpenDialog}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader>Desconsiderar avaliação?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Você tem certeza que não conhece o usuário: Username?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onCloseDialog}>
                    Cancelar
                    </Button>
                    <Button colorScheme='red' ml={3}>
                    Sim
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default BetweenUsersRating;