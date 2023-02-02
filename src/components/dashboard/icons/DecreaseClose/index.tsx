import React from "react";
import styles from "./styles.module.scss";

interface DecreaseCloseProps {
    color?: string;
}

function DecreaseClose( props: DecreaseCloseProps ) {
    return (
        <div className={`${styles["decrease-close-icon"]}`}>
            <span style={{ backgroundColor: props.color }}></span>
            <span style={{ backgroundColor: props.color }}></span>
        </div>
    );
}

export default DecreaseClose;
