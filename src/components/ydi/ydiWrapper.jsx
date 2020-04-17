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
        <div class="questions">
            <div class="question">
                <h2>{question.heading}</h2>
                <h3>{question.subheading}</h3>
                <div class={`you-draw-it ${question.key}`} data-key={question.key} aria-labelledby={`hint-${question.key}`}>
                    {children}
                </div>
                <div id={`hint-${question.key}`} class="accessibility" hidden aria-hidden="false">
                    {question.accessibility}
                </div>
                <div class={`result ${question.key}`}>
                    <div class="actionContainer" aria-hidden="true">
                        <button class="showAction" disabled={!confirmAllowed} onClick={confirmHandler}>Wie ist es tatsächlich?</button>
                        <div class="tooltipcontainer">
                            <span class="tooltiptext">Ziehen Sie den Balken! Der Klick verrät, ob ihre Schätzung stimmt.</span>
                        </div>
                    </div>
                    <div class="text" hidden={!confirmed} aria-hidden="false">{question.result}</div>
                </div>
            </div>
        </div>
    );
};

export default YDIWrapper;
