import React from 'react';
import styles from './styles.module.scss';
import { FaCheck } from 'react-icons/fa';

interface CheckboxSimpleProps {
    id: string
    name: string
    type?: 'radio' | 'checkbox'
}

function CheckboxSimple( props: CheckboxSimpleProps ) {
    return (
        <div className={`${styles['checkbox-simple']}`}>
            <input type={ props.type ?? 'checkbox' } name={props.name} id={props.id} />
            <div className={`${styles['checkbox-simple__checkbox']} flex flex-align-center flex-justify-center`}>
                <FaCheck />
            </div>
        </div>
    )
}

export default CheckboxSimple;