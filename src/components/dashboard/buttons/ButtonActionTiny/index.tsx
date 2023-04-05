'use client'

import React, { useId } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';

interface ButtonActionTinyProps {
    icon?: JSX.Element;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler;
    bgColor?: string;
    tooltip?: string;
}

function ButtonActionTiny( props: ButtonActionTinyProps ) {
    return (
        <Tippy content={ props.tooltip } disabled={ props.tooltip ? false : true }>
            <button 
                className={`${styles['button-action-tiny']} flex flex-justify-center flex-align-center default-shadow`}
                type={ props.type || 'button' }
                onClick={ props.onClick }
                style={{ backgroundColor: props.bgColor }}
            >
                {props.icon}
            </button>
        </Tippy>
    )
}

export default ButtonActionTiny;
