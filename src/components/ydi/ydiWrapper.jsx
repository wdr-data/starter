import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import classNames from 'class-names';
import ReactMarkdown from 'react-markdown';

import styles from "./ydiWrapper.module.css";

export const YDIWrapper = ({ question, confirmAllowed, onConfirm, children, ctaMessage }) => {
    const [confirmed, setConfirmed] = useState(false);
    const confirmHandler = useCallback(() => {
        setConfirmed(true);
        onConfirm();
    }, [setConfirmed, onConfirm])
    return (
        <div className={styles.questions}>
            <div className={styles.question}>
                <h4>{question.heading}</h4>
                <figcaption>{question.subheading}</figcaption>
                <div className={classNames(styles.youDrawIt, question.key)} data-key={question.key} aria-labelledby={`hint-${question.key}`}>
                    {children}
                </div>
                <div id={`hint-${question.key}`} className={styles.accessibility} hidden aria-hidden="false">
                    {question.accessibility}
                </div>
                <div className={classNames(styles.result, question.key, confirmAllowed && styles.finished, confirmed && styles.shown)}>
                    <div className={styles.source} hidden={!confirmed} aria-hidden="false">
                        <span>Quelle: <a href={question.source.url} aria-label="Quelle">{question.source.title}</a></span>
                    </div>
                    <div className={styles.actionContainer} aria-hidden="true">
                        <button className={styles.showAction} disabled={!confirmAllowed} onClick={confirmHandler}>Wie ist es tatsächlich?</button>
                        <div className={styles.tooltipContainer}>
                            <div className={styles.tooltipText}>{ctaMessage}</div>
                        </div>
                    </div>
                    <div className={styles.text} hidden={!confirmed} aria-hidden="false"><ReactMarkdown source={question.result} linkTarget="_blank" /></div>
                </div>
            </div>
        </div>
    );
};

export default YDIWrapper;
