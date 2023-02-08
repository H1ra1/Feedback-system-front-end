'use client'

import React, { useId } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './styles.module.scss';

interface ButtonActionTinyProps {
    icon?: JSX.Element;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler;
    bgColor?: string;
    tooltip?: string;
}

function ButtonActionTiny( props: ButtonActionTinyProps ) {
    const BUTTON_ID = useId();

    return (
        <>
            <button 
                className={`${styles['button-action-tiny']} flex flex-justify-center flex-align-center default-shadow`}
                type={ props.type || 'button' }
                onClick={ props.onClick }
                style={{ backgroundColor: props.bgColor }}
                id={BUTTON_ID}
            >
                {props.icon}
            </button>

            { props.tooltip && <Tooltip anchorId={BUTTON_ID} content={props.tooltip}/> }
            
        </>
    )
}

export default ButtonActionTiny;
