'use client'

import React, { useEffect, useState } from 'react';
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
    Box,
    Tooltip
  } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

interface BetweenUsersRatingProps {
    rating_user_code: string
}

function BetweenUsersRating( props: BetweenUsersRatingProps ) {
    const [ tableHeader, setTableHeader ]                       = useState< any >( [] );
    const [ tableBody, setTableBody ]                           = useState( [] );
    const [ expectedAnswers, setExpectedAnswers ]               = useState< any >( [] );
    const [ currentPointsModal, setCurrentPointsModal ]         = useState< any >( {} );
    const [ currentRemoveUserRate, setCurrentRemoveUserRate ]   = useState< any >( {} );
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

    function mountTableHeader( object: any ) {
        const TABLE_HEADER: any = [
            {
                item: '#'
            },
            {
                item: 'Nome'
            }
        ];

        object.questions.questions.forEach( ( question: any ) => {
            if( question.evaluation_type != 'pfo' && question.evaluation_type != 'pfa' )
                TABLE_HEADER.push( {
                    item: question.question_alias,
                    tooltip: question.question
                } );
        } );

        TABLE_HEADER.push( {
            item: 'Pontos fortes e fracos'
        } );

        setTableHeader( TABLE_HEADER );
    }

    function mountTableBody( object: any ) {
        const TABLE_BODY: any = [];

        object.users_to_be_rated.forEach( ( user_to_be_rated: any ) => {
            const ITEMS: any = {
                id: user_to_be_rated.id,
                items: [
                    {
                        item: 'remove'
                    },
                    {
                        item: 'name',
                        value: user_to_be_rated.rated_name,
                        department: user_to_be_rated.department,
                        unit: user_to_be_rated.unit,
                        position: user_to_be_rated.position
                    }
                ]
            };

            object.questions.questions.forEach( ( question: any ) => {
                if( question.evaluation_type != 'pfo' && question.evaluation_type != 'pfa' ) {
                    if( question.question_to_list.length == 0 || question.question_to_list.includes( user_to_be_rated.position ) ) {
                        ITEMS.items.push( {
                            id: `${user_to_be_rated.id}-${question.id}`,
                            question_id: question.id,
                            item: 'radio'
                        } );
                    } else {
                        ITEMS.items.push( {
                            item: 'text',
                            value: '~'
                        } );
                    }
                }
            } );

            ITEMS.items.push( {
                id: `points-${user_to_be_rated.id}`,
                item: 'points'
            } );

            TABLE_BODY.push( ITEMS );
        } );

        setTableBody( TABLE_BODY );
    }

    function mountExpectedAnswers( object: any ) {
        const EXPECTED_ANSWERS: any = {};

        for ( const USER_RATED of object.users_to_be_rated ) {
            const ITEM: any = {
                rating_user_id: USER_RATED.id,
                rated_name: USER_RATED.rated_name,
                questions: {},
                cancel: false
            }

            for( const QUESTION of object.questions.questions ) {
                if( QUESTION.evaluation_type != 'pfo' && QUESTION.evaluation_type != 'pfa'  ) {
                    if( QUESTION.question_to_list.length == 0 || QUESTION.question_to_list.includes( USER_RATED.position ) ) {
                        ITEM.questions[ QUESTION.id ] = {
                            id: QUESTION.id,
                            question_alias:  QUESTION.question_alias,
                            answer: '',
                            done: false
                        }
                    }
                } else {
                    ITEM.questions[ QUESTION.evaluation_type ] = {
                        id: QUESTION.id,
                        question_alias:  QUESTION.question_alias,
                        answer: '',
                        done: false
                    }
                }
            }

            EXPECTED_ANSWERS[ USER_RATED.id ] = ITEM;
        }

        setExpectedAnswers( EXPECTED_ANSWERS );
    }

    function updateRadioAnswer( radioResponse: any ) {
        const UPDATE_EXPECT_ANSWERS: any = expectedAnswers;
        UPDATE_EXPECT_ANSWERS[ radioResponse.rating_user_id ].questions[ radioResponse.question_id ].answer = radioResponse.answer;
        UPDATE_EXPECT_ANSWERS[ radioResponse.rating_user_id ].questions[ radioResponse.question_id ].done   = true;
    }

    function openModalPoints( ratingUserId: number ) {
        const RATING_USER_EXPECTED_ANSWER: any = expectedAnswers[ ratingUserId ];

        setCurrentPointsModal( {
            rating_user_id: ratingUserId,
            pfo: RATING_USER_EXPECTED_ANSWER.questions.pfo.answer,
            pfa: RATING_USER_EXPECTED_ANSWER.questions.pfa.answer
        } );

        onOpenModal();
    }

    function updateModalPoints( event: any, type: string ) {
        const EXPECTED_ANSWERS: any  = expectedAnswers;
        const CURRENT_POINTS_MODAL   = currentPointsModal;

        EXPECTED_ANSWERS[ CURRENT_POINTS_MODAL.rating_user_id ].questions[ type ].answer = event.target.value;

        setExpectedAnswers( EXPECTED_ANSWERS );
    }

    function openCurrentRemoveUserRated( ratingUserId: number ) {
        const RATING_USER: any = expectedAnswers[ ratingUserId ];

        setCurrentRemoveUserRate( {
            rating_user_id:  ratingUserId,
            rated_user_name: RATING_USER.rated_name
        } );

        onOpenDialog();
    }

    function removeCurrentUserRated( ratingUserId: number ) {
        const EXPECTED_ANSWERS: any  = expectedAnswers;

        EXPECTED_ANSWERS[ ratingUserId ].cancel = true;

        setExpectedAnswers( EXPECTED_ANSWERS );

        onCloseDialog();
    }

    useEffect( () => {
        async function getRatingRows() {
            const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${props.rating_user_code}/` );
        
            if( ! RESPONSE.ok )
                throw new Error( RESPONSE.statusText );
        
            const RESPONDE_PARSED = await RESPONSE.json();

            mountTableHeader( RESPONDE_PARSED.data );
            mountTableBody( RESPONDE_PARSED.data );
            mountExpectedAnswers( RESPONDE_PARSED.data );
        }

        getRatingRows();
    }, [ props.rating_user_code ] );

    return (
        <div className={`${styles[ 'between-users-rating' ]} flex flex-justify-center`}>
            <div className={`${styles[ 'between-users-rating__container' ]}`}>
                <table>
                    <thead>
                        <tr>
                            { tableHeader.map( ( header: any, index: number ) => (
                                <Tooltip hasArrow label={header.tooltip} key={`header-${index}`}>
                                    <th>{header.item}</th>
                                </Tooltip>
                            ) ) }
                        </tr>
                    </thead>

                    <tbody>
                        { tableBody.map( ( tr: any, index ) => (
                            <tr key={index} className={ expectedAnswers[ tr.id ].cancel ? styles[ '--hide' ] : '' }>
                                { tr.items.map( ( body: any, index: number ) => (
                                    <td key={index}>
                                        {body.item == 'remove' && ( 
                                            <Tooltip hasArrow label='Desconsiderar avaliação' placement='right'>
                                                <Button 
                                                    colorScheme={'red'} 
                                                    size='sm' 
                                                    fontSize={24} 
                                                    onClick={ () => openCurrentRemoveUserRated( tr.id ) 
                                                }>
                                                    <MdClose />
                                                </Button>
                                            </Tooltip>
                                        )}

                                        {body.item == 'name' && ( body.value )}

                                        {body.item == 'text' && ( body.value )}

                                        {body.item == 'radio' && ( 
                                            <BulletRating 
                                                id={body.id ? body.id : index}
                                                callback={ ( value: number ) => { updateRadioAnswer( { 
                                                    answer: value, 
                                                    rating_user_id: tr.id,
                                                    question_id: body.question_id
                                                } ) } }
                                                tooltip={tableHeader[index].tooltip}
                                            /> 
                                        )}

                                        {body.item == 'points' && ( <Button onClick={() => openModalPoints( tr.id )} >Responder</Button> ) }
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
                                    <Textarea 
                                        defaultValue={ currentPointsModal.pfo ?? '' }
                                        onChange={ ( event ) => updateModalPoints( event, 'pfo' ) }
                                        placeholder='Escreva aqui os pontos fortes' 
                                        _focus={ { borderColor: colors.highlightColor } }
                                    />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' fontWeight={600}>Pontos fracos</Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel pb={4}>
                                    <Textarea 
                                        defaultValue={ currentPointsModal.pfa ?? '' }
                                        onChange={ ( event ) => updateModalPoints( event, 'pfa' ) }
                                        placeholder='Escreva aqui os pontos fracos' 
                                        _focus={ { borderColor: colors.highlightColor } }
                                    />
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
                            onClick={onCloseModal}
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
                    Você tem certeza que não conhece o usuário: <br></br><strong>{ currentRemoveUserRate.rated_user_name }</strong>?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onCloseDialog}>
                    Cancelar
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={ () => removeCurrentUserRated( currentRemoveUserRate.rating_user_id ) }>
                    Sim
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default BetweenUsersRating;