'use client'

import React, { useState, useEffect, useId } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';

interface SimpleProgressBarProps {
    progress: number
    tooltip?: string
}

function SimpleProgressBar( props: SimpleProgressBarProps ) {
    const PROGRESS_ID = useId();
    const [ progress, setProgress ] = useState< number >( 0 );

    useEffect( () => {
        function fillProgress() {
            let fill_progress = 0

            const INTERVAL = setInterval( () => {
                fill_progress += 1;
                setProgress( fill_progress );

                if( Number( fill_progress ) >= Number( props.progress ) ) {
                    clearInterval( INTERVAL );
                }
            }, 50 );
        }

        fillProgress();
    }, [ props.progress ] );

    return (
        <Tippy content={ props.tooltip } disabled={ props.tooltip ? false : true }>
            <div className={ `${ styles[ 'simple-progress-bar' ] }` } data-simple-progress-bar={ `${progress}%` } id={ PROGRESS_ID }>
                <div className={ `${ styles['simple-progress-bar__progress'] }` } style={ { width: `${progress}%` } }></div>
            </div>
        </Tippy>
    )
}

export default SimpleProgressBar;