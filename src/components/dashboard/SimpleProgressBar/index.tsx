'use client'

import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface SimpleProgressBarProps {
    progress: number
}

function SimpleProgressBar( props: SimpleProgressBarProps ) {
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
        <div className={ `${ styles[ 'simple-progress-bar' ] }` } data-simple-progress-bar={ `${progress}%` }>
            <div className={ `${ styles['simple-progress-bar__progress'] }` } style={ { width: `${progress}%` } }></div>
        </div>
    )
}

export default SimpleProgressBar;