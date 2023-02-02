import React from 'react';
import styles from './styles.module.scss';

interface TyneHolderProps {
    title: string;
    subtitle?: string;
    description?: string;
    icon?: JSX.Element;
}

function TinyHolder( props: TyneHolderProps ) {
  return (
    <div className={`${styles['tiny-holder']} default-shadow flex flex-column flex-justify-between`}>
        <div className={`${styles['tiny-holder__body_content']} flex flex-align-center`}>
            <div className={`${styles['tiny-holder-icon-holder']} flex flex-align-center flex-justify-center`}>
                {props.icon}
            </div>
            <div className={`${styles['tiny-holder-titles-holder']}`}>
                <span>{props.subtitle}</span>
                <p>{props.title}</p>
            </div>
        </div>

        {props.description != undefined && (
            <div className={`${styles['tiny-holder__footer_content']}`}>
                <p>{props.description}</p>
            </div>
        )}
    </div>
  )
}

export default TinyHolder;
