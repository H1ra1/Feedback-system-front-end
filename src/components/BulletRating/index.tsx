'use client'

import React, { useState } from 'react';
import styles from './styles.module.scss';

interface BulletRatingProps {
    id:         string|number
    callback?:  Function
}

interface RadioProps {
    value:      number
    checked:    boolean
    active:     boolean
}

function BulletRating( props: BulletRatingProps ) {
    const [ radios, setRadios ] = useState< RadioProps[] >( [
        {
            value: 1,
            checked: false,
            active: false
        },
        {
            value: 2,
            checked: false,
            active: false
        },
        {
            value: 3,
            checked: false,
            active: false
        },
        {
            value: 4,
            checked: false,
            active: false
        },
        {
            value: 5,
            checked: false,
            active: false
        },
    ] );

    function activeBulletRating( radio: number ) {
        const CHECKED_RADIO_INDEX = radio;
        
        for ( const radio in radios ) {
            const index: number = parseInt( radio );

            if( index < CHECKED_RADIO_INDEX ) {
                radios[ index ].active  = true;
            } else {
                radios[ index ].checked = false;
                radios[ index ].active  = false;
            }

            if( index === CHECKED_RADIO_INDEX ) {
                radios[ index ].checked = true;
                radios[ index ].active  = true;
            } else {
                radios[ index ].checked = false;
            }
        }

        setRadios( [ ...radios ] );

        if( props.callback )
            props.callback( radios[ CHECKED_RADIO_INDEX ].value );
    }

    return (
        <div className={`${styles[ 'bullet-rating' ]} flex flex-align-center flex-justify-center`}>
            { radios.map( ( radio, index ) => (
                <label htmlFor={`bullet-rating-${props.id}-${index}`} key={`${props.id}-${index}`}>
                    <input 
                        type="radio" 
                        name="bullet-rating" 
                        id={`bullet-rating-${props.id}-${index}`} 
                        className={`${radio.active ? styles[ 'bullet-rating--active' ] : ''}`} 
                        onClick={ () => activeBulletRating( index ) } 
                    />
                    <span></span>
                </label>
                
            ) ) }
        </div>
    );
}

export default BulletRating;
