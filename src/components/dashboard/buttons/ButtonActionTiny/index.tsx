'use client'

import React, { useId } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
import SpinLoading from '../../loadings/SpinLoading';

interface ButtonActionTinyProps {
    icon?: JSX.Element;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler;
    bgColor?: string;
    tooltip?: string;
    loading?: boolean
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
                { props.loading ? <SpinLoading /> : props.icon}
            </button>
        </Tippy>
    )
}

export default ButtonActionTiny;
