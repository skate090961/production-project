import {useState} from "react";
import styles from "./Counter.module.scss";

export function Counter() {
    const [counter, setCounter] = useState(0)

    return (
        <div className={styles.block}>
            <h1 className={styles.title}>{`Counter123: ${counter}`}</h1>
            <button className={styles.btn} onClick={() => setCounter(prev => prev + 1)}>inc</button>
        </div>
    );
}