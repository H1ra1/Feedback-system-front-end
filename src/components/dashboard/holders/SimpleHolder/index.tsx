import React from 'react';
import styles from './styles.module.scss';

interface SimpleHolderProps {

  sizeClasses?: string;
  supTitle?: string;
  subTitle?: string;
  mainTitle?: string;
  icon?: JSX.Element;
  children?: React.ReactNode | React.ReactNode[];
}

function SimpleHolder( props: SimpleHolderProps ) {
  return (
    <div className={`${styles['simple-holder']} default-shadow ${ props.sizeClasses != undefined ? props.sizeClasses : ''}`}>
        <div className={`${styles['simple-holder__header']}`}>
            <div className={`${styles['title-holder']}`}>
                <p className={`${styles['aux-title']}`}>{props.supTitle}</p>
                <div className={`${styles['main-title-holder']} flex flex-align-center`}>
                    {props.icon}
                    <p className={`${styles['main-title']}`}>{props.mainTitle}</p>
                </div>
                <p className={`${styles['aux-title']}`}>{props.subTitle}</p>
            </div>
        </div>

        <div className={`${styles['simple-holder__body']}`}>
            {props.children}
        </div>
    </div>
  )
}

export default SimpleHolder;
