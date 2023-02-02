import React from 'react';
import styles from './styles.module.scss';


interface ButtonActionTinyProps {
    icon?: JSX.Element;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler;
    bgColor?: string;
}

function ButtonActionTiny( props: ButtonActionTinyProps ) {
    return (
        <button 
        className={`${styles['button-action-tiny']} flex flex-justify-center flex-align-center default-shadow`}
        type={ props.type || 'button' }
        onClick={props.onClick }
        style={{ backgroundColor: props.bgColor }}
        >
            {props.icon}
        </button>
    )
}

export default ButtonActionTiny;
