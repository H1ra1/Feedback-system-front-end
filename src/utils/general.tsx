export function generateRandomColor() {
    const RANDOM_COLOR = Math.floor( Math.random() * 16777215 ).toString( 16 );

    return `#${RANDOM_COLOR}`;
}