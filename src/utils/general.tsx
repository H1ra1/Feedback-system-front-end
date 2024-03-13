export function generateRandomColor() {
    const RANDOM_COLOR = Math.floor( Math.random() * 16777215 ).toString( 16 );

    return `#${RANDOM_COLOR}`;
}

export function capitalizeFirstLetter( string: string ) {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

export function positionsDict( position: string ): string {
    const POSITIONS: any = {
        leader: 'Líder',
        associate: 'Associado',
        partner: 'Sócio'
    }

    return POSITIONS[ position ] != undefined ? POSITIONS[ position ] :  '~';
}

export function toTimestamp( strDate: string ) {
    let formattedDateTime   = strDate.replace( /\s+/g, '' ).trim().split( '-' );

    if( formattedDateTime.length < 2 )
        return 0;

    let dateArray           = formattedDateTime[ 0 ].split( '/' );
    let dateTimeArray       = formattedDateTime[ 1 ].split( ':' );

    const dateTime = new Date( `${dateArray[ 2 ]}/${dateArray[ 1 ]}/${dateArray[ 0 ]} ${dateTimeArray[ 0 ]}:${dateTimeArray[ 1 ]}:${dateTimeArray[ 2 ]}` ).getTime();
    
    return dateTime / 1000;
  }