'use client'

import React, { useState } from 'react';
import styles from './styles.module.scss';
import { MdAirlineSeatLegroomReduced } from 'react-icons/md';
import DecreaseClose from '../../icons/DecreaseClose';

function SimpleModal() {
    const [ showModal, setShowModal ] = useState< boolean >( false );

    return (
        <>
            {showModal ?
            <div className={`${styles['simple-modal']} flex flex-align-center flex-justify-center`}>
                <div className={`${styles['simple-modal-box']} default-shadow`}>
                    <div className={`${styles['simple-modal-box--close-modal']} default-shadow flex flex-align-center flex-justify-center`}><DecreaseClose /></div>

                    <div className={`${styles['simple-modal-box__title_holder']} flex flex-align-center flex-gap-10`}>
                        <MdAirlineSeatLegroomReduced />
                        <p>Título do modal</p>
                    </div>
                </div>
            </div>
            : ''}
        </>
    )
}

export default SimpleModal;
