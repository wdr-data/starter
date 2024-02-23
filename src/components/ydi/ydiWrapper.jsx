import React from "react";
import { useCallback, useState, useContext } from "react";
import classNames from "class-names";
import ReactMarkdown from "react-markdown";

import FrontmatterContext from "../../templates/frontmatterContext";
import styles from "./ydiWrapper.module.css";
import {
  sendEventClickAction,
  pageConfigFromFrontmatter,
} from "../../lib/piano-analytics";

export const YDIWrapper = ({
  question,
  confirmAllowed,
  onConfirm,
  children,
}) => {
  const frontmatterContext = useContext(FrontmatterContext);

  const [confirmed, setConfirmed] = useState(false);
  const confirmHandler = useCallback(() => {
    setConfirmed(true);
    onConfirm();

    sendEventClickAction(pageConfigFromFrontmatter(frontmatterContext), {
      clickText: "Wie ist es tatsächlich?",
      clickTarget: question.heading,
    });
  }, [setConfirmed, onConfirm, question, frontmatterContext]);

  const cgParams = Object.keys(frontmatterContext).filter((param) =>
    param.startsWith("cg"),
  );
  const additionalCgParams = {
    [`cg${cgParams.length + 1}`]: question.key,
  };

  return (
    <div className={styles.questions}>
      <div className={styles.question}>
        <h4>{question.heading}</h4>
        <figcaption>{question.subheading}</figcaption>
        <div
          className={classNames(styles.youDrawIt)}
          aria-labelledby={`hint-${question.key}`}
        >
          {children}
        </div>
        <div
          id={`hint-${question.key}`}
          className={styles.accessibility}
          hidden
          aria-hidden="false"
        >
          {question.accessibility}
        </div>
        <div
          className={classNames(
            styles.result,
            confirmAllowed && styles.finished,
            confirmed && styles.shown,
          )}
        >
          <div className={styles.actionContainer} aria-hidden="true">
            <button
              className={styles.showAction}
              disabled={!confirmAllowed || confirmed}
              onClick={confirmHandler}
            >
              Wie ist es tatsächlich?
            </button>
          </div>
          <div className={styles.text} hidden={!confirmed} aria-hidden="false">
            <ReactMarkdown source={question.result} linkTarget="_blank" />
          </div>
          <div
            className={styles.source}
            hidden={!confirmed}
            aria-hidden="false"
          >
            <span id={`source-label-${question.key}`}>Quelle:</span>&nbsp;
            <a
              href={question.source.url}
              rel="noopener noreferrer"
              target="_blank"
              aria-labelledby={`source-label-${question.key}`}
            >
              {question.source.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YDIWrapper;
