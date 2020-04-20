import React from "react";
import { useCallback } from "react";
import { useState } from "react";

export const YDIWrapper = ({ question, confirmAllowed, onConfirm, children }) => {
    const [confirmed, setConfirmed] = useState(false);
    const confirmHandler = useCallback(() => {
        setConfirmed(true);
        onConfirm();
    })
    return (
        <div className="questions">
            <div className="question">
                <h2>{question.heading}</h2>
                <h3>{question.subheading}</h3>
                <div className={`you-draw-it ${question.key}`} data-key={question.key} aria-labelledby={`hint-${question.key}`}>
                    {children}
                </div>
                <div id={`hint-${question.key}`} className="accessibility" hidden aria-hidden="false">
                    {question.accessibility}
                </div>
                <div className={`result ${question.key}`}>
                    <div className="actionContainer" aria-hidden="true">
                        <button className="showAction" disabled={!confirmAllowed} onClick={confirmHandler}>Wie ist es tatsächlich?</button>
                        <div className="tooltipcontainer">
                            <span className="tooltiptext">Ziehen Sie den Balken! Der Klick verrät, ob ihre Schätzung stimmt.</span>
                        </div>
                    </div>
                    <div className="text" hidden={!confirmed} aria-hidden="false">{question.result}</div>
                </div>
            </div>
        </div>
    );
};

export default YDIWrapper;
