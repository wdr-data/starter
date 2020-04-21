import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import classNames from 'class-names';

import styles from "./ydiWrapper.module.css";

export const YDIWrapper = ({ question, confirmAllowed, onConfirm, children }) => {
    const [confirmed, setConfirmed] = useState(false);
    const confirmHandler = useCallback(() => {
        setConfirmed(true);
        onConfirm();
    }, [setConfirmed, onConfirm])
    return (
        <div className={styles.questions}>
            <div className={styles.question}>
                <h3>{question.heading}</h3>
                <h4>{question.subheading}</h4>
                <div className={classNames(styles.youDrawIt, question.key)} data-key={question.key} aria-labelledby={`hint-${question.key}`}>
                    {children}
                </div>
                <div id={`hint-${question.key}`} className={styles.accessibility} hidden aria-hidden="false">
                    {question.accessibility}
                </div>
                <div className={classNames(styles.result, question.key, confirmAllowed && styles.finished, confirmed && styles.shown)}>
                    <div className={styles.actionContainer} aria-hidden="true">
                        <button className={styles.showAction} disabled={!confirmAllowed} onClick={confirmHandler}>Wie ist es tatsächlich?</button>
                        <div className={styles.tooltipContainer}>
                            <span className={styles.tooltipText}>Ziehen Sie den Balken! Der Klick verrät, ob ihre Schätzung stimmt.</span>
                        </div>
                    </div>
                    <p className={styles.text} hidden={!confirmed} aria-hidden="false">{question.result}</p>
                </div>
            </div>
        </div>
    );
};

export default YDIWrapper;
