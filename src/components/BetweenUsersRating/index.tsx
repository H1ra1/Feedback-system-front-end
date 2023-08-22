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
    Tooltip,
    useToast,
    Text,
    Spinner,
    Stack
  } from '@chakra-ui/react';
import { MdClose, MdCheckCircle, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { capitalizeFirstLetter } from '@/utils/general';

interface BetweenUsersRatingProps {
    rating_user_code: string
}

function BetweenUsersRating( props: BetweenUsersRatingProps ) {
    const [ tableHeader, setTableHeader ]                                   = useState< any >( [] );
    const [ tableBody, setTableBody ]                                       = useState( [] );
    const [ expectedAnswers, setExpectedAnswers ]                           = useState< any >( [] );
    const [ currentPointsModal, setCurrentPointsModal ]                     = useState< any >( {} );
    const [ currentRemoveUserRate, setCurrentRemoveUserRate ]               = useState< any >( {} );
    const [ ratingFinished, setRatingFinished ]                             = useState< boolean >( false );
    const [ buttonRatingFinishedLoading, setButtonRatingFinishedLoading ]   = useState< boolean >( false ); 
    const [ sendRatingStatus, setSendRatingStatus ]                         = useState< string >( 'waiting' );
    const [ responseStatus, setResponseStatus ]                             = useState< string >( 'pend' );
    const [ responseStatusLoading, setResponseStatusLoading ]               = useState< boolean >( true );
    const cancelRef                                                         = React.useRef( null );
    const toast                                                             = useToast();
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
    const { 
        isOpen: isOpenModalResume, 
        onOpen: onOpenModalResume, 
        onClose: onCloseModalResume 
    } = useDisclosure();
    

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
                        item:           'remove',
                        self_rating:    user_to_be_rated.rated_user_id == object.user_id
                    },
                    {
                        item:           'name',
                        value:          user_to_be_rated.rated_name,
                        department:     user_to_be_rated.department,
                        unit:           user_to_be_rated.unit,
                        position:       user_to_be_rated.position,
                        self_rating:    user_to_be_rated.rated_user_id == object.user_id
                    }
                ]
            };

            object.questions.questions.forEach( ( question: any ) => {
                if( question.evaluation_type != 'pfo' && question.evaluation_type != 'pfa' ) {
                    if( question.question_to_list.length == 0 || question.question_to_list.includes( user_to_be_rated.position ) ) {
                        ITEMS.items.push( {
                            id: `${user_to_be_rated.id}-${question.id}`,
                            question_id:    question.id,
                            item:           'radio'
                        } );
                    } else {
                        ITEMS.items.push( {
                            item:  'text',
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
                rating_user_id: USER_RATED.rated_user_id,
                rating_user_row_id: USER_RATED.id,
                rated_name: USER_RATED.rated_name,
                questions: {},
                cancel: false
            }

            for( const QUESTION of object.questions.questions ) {
                if( QUESTION.evaluation_type != 'pfo' && QUESTION.evaluation_type != 'pfa'  ) {
                    if( QUESTION.question_to_list.length == 0 || QUESTION.question_to_list.includes( USER_RATED.position ) ) {
                        ITEM.questions[ QUESTION.id ] = {
                            id: QUESTION.id,
                            question_group_id: QUESTION.question_group,
                            question_alias:  QUESTION.question_alias,
                            answer: '',
                            answer_type: 'n',
                            done: false
                        }
                    }
                } else {
                    ITEM.questions[ QUESTION.evaluation_type ] = {
                        id: QUESTION.id,
                        question_group_id: QUESTION.question_group,
                        question_alias:  QUESTION.question_alias,
                        answer_type: QUESTION.evaluation_type,
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

        setExpectedAnswers( UPDATE_EXPECT_ANSWERS );

        checkIfRatingIsDone();
    }

    function openModalPoints( ratingUserId: number ) {
        const RATING_USER_EXPECTED_ANSWER: any = expectedAnswers[ ratingUserId ];

        setCurrentPointsModal( {
            rating_user_id: ratingUserId,
            rated_name: RATING_USER_EXPECTED_ANSWER.rated_name,
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

        checkIfRatingIsDone();
    }

    function openCurrentRemoveUserRated( ratingUserId: number ) {
        const RATING_USER: any = expectedAnswers[ ratingUserId ];

        setCurrentRemoveUserRate( {
            rating_user_id:  ratingUserId,
            rated_user_name: RATING_USER.rated_name
        } );

        onOpenDialog();
    }

    async function removeCurrentUserRated( ratingUserId: number ) {
        const EXPECTED_ANSWERS: any  = expectedAnswers;
        const RESPONSE               = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${props.rating_user_code}/cancel/${ratingUserId}/`, {
            method: 'POST'
        } );

        if( ! RESPONSE.ok ) {
            toast( {
                status: 'error',
                title: 'Erro!',
                description: 'Erro ao remover um usuário da avaliação, por favor tente novamente mais tarde ou contate alguém da equipe.',
                position: 'bottom-right',
                isClosable: true
            } );

            throw new Error( RESPONSE.statusText );
        }

        EXPECTED_ANSWERS[ ratingUserId ].cancel = true;

        setExpectedAnswers( EXPECTED_ANSWERS );

        onCloseDialog();
    }

    function checkIfRatingIsDone() {
        const FINISHED: any = [];

        for( const RATING_ID in expectedAnswers ) {
            const RATING = expectedAnswers[ RATING_ID ]
            if( RATING.cancel )
                continue

            for( const QUESTION_ID in RATING.questions ) {
                const QUESTION = RATING.questions[ QUESTION_ID ];

                FINISHED.push( QUESTION.done );
            }
        }

        if( FINISHED.every( ( val: any ) => val === true ) ) {
            setRatingFinished( true );
        } else {
            setRatingFinished( false );
        }
    }

    function confirmPointsAnswers() {
        const EXPECTED_ANSWERS: any     = expectedAnswers;
        const CURRENT_POINTS_MODAL      = currentPointsModal;
        const PFO                       = EXPECTED_ANSWERS[ CURRENT_POINTS_MODAL.rating_user_id ].questions[ 'pfo' ];
        const PFA                       = EXPECTED_ANSWERS[ CURRENT_POINTS_MODAL.rating_user_id ].questions[ 'pfa' ];

        PFO.done = PFO.answer != '' ? true : false;
        PFA.done = PFA.answer != '' ? true : false;

        if( PFO.answer != '' && PFA.answer != '' ) {
            onCloseModal();
        } else {
            toast( {
                title: 'Atenção!',
                description: 'Preencha os pontos fortes e fracos.',
                status: 'warning',
                position: 'bottom-right',
                isClosable: true
            } );
        }

        setExpectedAnswers( EXPECTED_ANSWERS );

        checkIfRatingIsDone();
    }

    function closePointsModal() {
        confirmPointsAnswers();

        onCloseModal()
    }

    function finishRating() {
        onOpenModalResume();

        setButtonRatingFinishedLoading( true );
    }

    function closeRatingResume() {
        setButtonRatingFinishedLoading( false );

        onCloseModalResume();
    }

    function prepareSendRatingObject( answers: any ) {
        const RATING_USER_ROWS_OBJECT = [];

        for( const RATING_USER_ROW_ID in answers ) {
            if( answers[ RATING_USER_ROW_ID ].cancel != true ) {
                const RATING_USER_ROW_OBJECT: any = {
                    rating_user_row_id: answers[ RATING_USER_ROW_ID ].rating_user_row_id,
                    questions:          []
                }
    
                for ( const QUESTION_ID in answers[ RATING_USER_ROW_ID ].questions ) {
                    const QUESTION_OBJECT = {
                        question_id:        answers[ RATING_USER_ROW_ID ].questions[ QUESTION_ID ].id,
                        question_group_id:  answers[ RATING_USER_ROW_ID ].questions[ QUESTION_ID ].question_group_id,
                        answer:             answers[ RATING_USER_ROW_ID ].questions[ QUESTION_ID ].answer,
                        answer_type:        answers[ RATING_USER_ROW_ID ].questions[ QUESTION_ID ].answer_type
                    }
    
                    RATING_USER_ROW_OBJECT.questions.push( QUESTION_OBJECT );
                }
    
                RATING_USER_ROWS_OBJECT.push( RATING_USER_ROW_OBJECT );
            }
        }

        return RATING_USER_ROWS_OBJECT;
    }

    async function sendRating() {
        setSendRatingStatus( 'sending' );

        const RATING_USER_ROWS_OBJECT = prepareSendRatingObject( expectedAnswers );

        const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${props.rating_user_code}/save/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( RATING_USER_ROWS_OBJECT )
        } );
        
        if( ! RESPONSE.ok ) {
            toast( {
                status: 'error',
                title: 'Erro!',
                description: 'Erro ao salvar a avaliação, por favor tente novamente mais tarde ou contate alguém da equipe.',
                position: 'bottom-right',
                isClosable: true
            } );

            throw new Error( RESPONSE.statusText );
        }

        setSendRatingStatus( 'sended' );

        toast( {
            status: 'success',
            title: 'Sucesso!',
            description: 'Avaliação salva com sucesso!',
            position: 'bottom-right',
            isClosable: true
        } );
    }

    useEffect( () => {
        async function getRatingRows() {
            const RESPONSE          = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${props.rating_user_code}/` );
            const RESPONDE_PARSED   = await RESPONSE.json();
            
            if( ! RESPONSE.ok ) {
                setResponseStatus( RESPONDE_PARSED.data.status != undefined ? RESPONDE_PARSED.data.status : 'fail' );
            } else {
                mountTableHeader( RESPONDE_PARSED.data );
                mountTableBody( RESPONDE_PARSED.data );
                mountExpectedAnswers( RESPONDE_PARSED.data );
            }

            setResponseStatusLoading( false );
        }

        getRatingRows();
    }, [ props.rating_user_code ] );

    if( responseStatus != 'canc' && responseStatus != 'expi' && responseStatus != 'done' && responseStatus != 'fail' ) {
        if( ! responseStatusLoading ) {
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
                                                    ! body.self_rating ? (
                                                        <Tooltip hasArrow label='Desconsiderar avaliação' placement='right'>
                                                            <Button 
                                                                colorScheme={'red'} 
                                                                size='sm' 
                                                                fontSize={16}
                                                                onClick={ () => openCurrentRemoveUserRated( tr.id ) 
                                                            }>
                                                                <MdClose />
                                                            </Button>
                                                        </Tooltip>
                                                    ) : '#'
                                                )}
    
                                                {body.item == 'name' && ( 
                                                    <Tooltip hasArrow label={
                                                        <Stack>
                                                            <Text>Departamento: {body.department}</Text>
                                                            <Text>Posição: {capitalizeFirstLetter( body.position )}</Text>
                                                            <Text>Unidade: {body.unit}</Text>
                                                        </Stack>
                                                    } placement='bottom'>
                                                        {body.value}
                                                    </Tooltip> 
                                                )}
    
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
    
                                                {body.item == 'points' && expectedAnswers[ tr.id ].questions.pfo.done && expectedAnswers[ tr.id ].questions.pfa.done ? ( 
                                                        <Button 
                                                            onClick={() => openModalPoints( tr.id )} 
                                                            colorScheme='whatsapp'
                                                            leftIcon={ <MdCheckCircle /> }
                                                        >
                                                            Respondido
                                                        </Button> 
                                                    ) : body.item == 'points' && (
                                                        <Button 
                                                            onClick={() => openModalPoints( tr.id )}
                                                        >
                                                            Responder
                                                        </Button> 
                                                    ) }
                                            </td>
                                        ) ) }
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
    
                        { sendRatingStatus != 'sended' && (
                            <div className={`${styles['between-users-rating__finish_container']} flex flex-justify-end m-t-20`}>
                                { ratingFinished ? (
                                    <Button 
                                        size='lg' 
                                        backgroundColor={ colors.highlightColor } 
                                        color={ colors.baseLight } 
                                        _hover={ {
                                            backgroundColor: colors.highlightColorMore
                                        } }
                                        onClick={ finishRating }
                                        isLoading={ buttonRatingFinishedLoading }
                                    >
                                        Finalizar avaliação
                                    </Button>
                                ) : ( 
                                    <Button 
                                        size='lg' 
                                        colorScheme='gray' 
                                        cursor='not-allowed'
                                        onClick={ () => {
                                            toast( {
                                                title: 'Erro!',
                                                description: 'Responda toda a avaliação antes e finalizar.',
                                                status: 'error',
                                                position: 'bottom-right',
                                                isClosable: true
                                            } );
                                        } }
                                    >
                                        Finalizar avaliação
                                    </Button>
                                ) }
                                
                            </div>
                        ) }
                    </div>
    
                    {/* Modal answer text */}
                    <Modal isOpen={isOpenModal} onClose={ closePointsModal } isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Text>Pontos fortes e fracos </Text>
                                <Text fontWeight={500} fontSize='.8em' color={ colors.highlightColor }>{ currentPointsModal.rated_name }</Text>
                            </ModalHeader>
                            
    
                            <ModalCloseButton onClick={ closePointsModal } />
    
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
                                        background: colors.highlightColorMore
                                    } }
                                    onClick={confirmPointsAnswers}
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
    
                    {/* Modal finish resume */}
                    <Modal isOpen={ isOpenModalResume } onClose={ onCloseModalResume } closeOnOverlayClick={ false }>
                        <ModalOverlay />
    
                        <ModalContent>
                            <ModalHeader>
                                { sendRatingStatus != 'sended' ? (
                                    <Text>Resumo da avaliação</Text>
                                ) : (
                                    <Text textAlign='center' color={ colors.baseDark } className='flex flex-align-center flex-justify-center flex-gap-5'>
                                        Avaliação enviada!
                                        <MdOutlineCheckCircleOutline color={ colors.success } size='30px'/>
                                    </Text>
                                ) }
                                
                            </ModalHeader>
    
                            <ModalBody>
                                { sendRatingStatus != 'sended' ? (
                                    <Text fontSize='.8em' paddingBottom='10px'>
                                        Antes de confirmar verifique se suas avaliações estão corretas, não será possível editar após a confirmação!
                                    </Text>
                                ) : (
                                    <Text fontSize='.8em' paddingBottom='10px' textAlign='center'>
                                        Muito obrigado por realizar a avaliação, sua colaboração é muito importante para o crescimento e melhorias da iHUB!
                                    </Text>
                                ) }
                                
                                <div className={ `${styles[ 'between-users-rating__rating_resumes' ]} custom-purple-scrollbar` }>
    
                                    { Object.keys( expectedAnswers ).map( ( rating_user_id, indice ) => (
                                        <div className={ styles[ 'rating-resume-item' ] } key={ indice }>
                                            <div className={ styles[ 'rating-resume-item__title' ] }>
                                                <p>{ expectedAnswers[ rating_user_id ].rated_name }</p>
                                            </div>
    
                                            { Object.keys( expectedAnswers[ rating_user_id ].questions ).map( ( question_id, indice ) => {
                                                if( question_id != 'pfo' && question_id != 'pfa' ) {
                                                    return (
                                                        <div className={ `${styles[ 'rating-resume-item__list' ]} flex flex-justify-between` } key={ indice }>
                                                            <p>{ expectedAnswers[ rating_user_id ].questions[ question_id ].question_alias }</p>
                                                            <span></span>
                                                            <p>{ expectedAnswers[ rating_user_id ].questions[ question_id ].answer }</p>
                                                        </div>
                                                    );
                                                }
                                            } ) }
    
                                            <div className={ `${styles[ 'rating-resume-item__title_text' ]}` }>
                                                <p>Pontos fortes</p>
                                                <p>{ expectedAnswers[ rating_user_id ].questions.pfo.answer }</p>
                                            </div>
    
                                            <div className={ `${styles[ 'rating-resume-item__title_text' ]}` }>
                                                <p>Pontos fracos</p>
                                                <p>{ expectedAnswers[ rating_user_id ].questions.pfa.answer }</p>
                                            </div>
                                        </div>
                                    ) ) }
                                </div>
    
                                <div className='flex flex-justify-end flex-align-end flex-gap-10 m-t-20'>
                                    { sendRatingStatus == 'waiting' && (
                                        <Text 
                                        cursor='pointer'
                                        transition='all .2s linear'
                                        _hover={ {
                                            color: colors.danger
                                        } }
                                        onClick={ closeRatingResume }
                                        >
                                            Cancelar
                                        </Text>
                                    ) }
                                        
                                    { sendRatingStatus == 'waiting' ? (
                                        <Button 
                                            backgroundColor={ colors.highlightColor } 
                                            color={ colors.baseLight } 
                                            _hover={ {
                                                backgroundColor: colors.highlightColorMore
                                            } }
                                            onClick={ sendRating }
                                        >
                                            Confirmar
                                        </Button>
                                    ) : sendRatingStatus == 'sending' && (
                                        <Button 
                                            backgroundColor={ colors.highlightColor } 
                                            color={ colors.baseLight } 
                                            _hover={ {
                                                backgroundColor: colors.highlightColorMore
                                            } }
                                            isLoading={ true }
                                            loadingText='Enviando avaliação'
                                        >
                                            Enviando
                                        </Button>
                                    ) }
                                    
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div className={`${styles[ 'between-users-rating__status_block' ]} flex flex-justify-center flex-align-center`}>
                    <Spinner color={colors.highlightColor} />
                </div>
            )
        }
    } else {
        return (
            <div className={`${styles[ 'between-users-rating__status_block' ]} flex flex-justify-center flex-align-center`}>
                <h1>Avaliação indisponível</h1>
            </div>
        )
    }
        
}

export default BetweenUsersRating;