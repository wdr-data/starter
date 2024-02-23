import React, { useMemo, useEffect } from "react";
import { useCallback, useState, useContext } from "react";
import classNames from "class-names";
import ReactMarkdown from "react-markdown";
import { v4 as uuid } from "uuid";
import removeMarkdown from "remove-markdown";

import { sendEventClickAction, usePageConfig } from "../../lib/piano-analytics";

import { GlobalQuizContext } from "../../templates/globalQuizContext";

import styles from "./quiz.module.css";

const QuizContext = React.createContext({});

export const Quiz = ({ children }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [id] = useState(uuid());
  const globalQuizContext = useContext(GlobalQuizContext);

  // Register the quiz in the global page context
  useEffect(() => {
    // Prevent multiple registration
    if (globalQuizContext.score[id] === undefined) {
      globalQuizContext.setScore((score) => ({ ...score, [id]: null }));
    }
  }, [id, globalQuizContext]);

  const quizContext = useMemo(
    () => ({
      question,
      setQuestion,
      selectedAnswer,
      setSelectedAnswer,
      answered,
      setAnswered,
      id,
    }),
    [
      question,
      setQuestion,
      selectedAnswer,
      setSelectedAnswer,
      answered,
      setAnswered,
      id,
    ],
  );

  return (
    <QuizContext.Provider value={quizContext}>
      <div className={styles.quiz}>{children}</div>
    </QuizContext.Provider>
  );
};

export const Image = (props) => {
  return <img className={styles.image} alt="" {...props} />;
};
export const Video = (props) => {
  return <video controls className={styles.video} {...props} />;
};
export const Audio = (props) => {
  return <audio controls className={styles.audio} {...props} />;
};

export const Question = ({ children }) => {
  const quizContext = useContext(QuizContext);

  useEffect(() => {
    const question = removeMarkdown(children);
    if (quizContext.question !== question) {
      quizContext.setQuestion(question);
    }
  }, [children, quizContext]);

  return (
    <div className={styles.question}>
      <ReactMarkdown source={children} />
    </div>
  );
};

const Checkmark = () => (
  <div className={styles.icon}>
    <svg viewBox="0 0 32 32" aria-label="Richtige Antwort">
      <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
    </svg>
  </div>
);

const Cross = () => (
  <div className={styles.icon}>
    <svg viewBox="0 0 32 32" aria-label="Falsche Antwort">
      <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
    </svg>
  </div>
);

export const Answer = ({ correct, children }) => {
  const [id] = useState(uuid());
  const quizContext = useContext(QuizContext);
  const globalQuizContext = useContext(GlobalQuizContext);
  const pianoPageConfig = usePageConfig();

  const selected = quizContext.selectedAnswer === id;

  const selectCallback = useCallback(() => {
    quizContext.setAnswered(true);
    quizContext.setSelectedAnswer(id);
    globalQuizContext.setScore((score) => ({
      ...score,
      [quizContext.id]: correct,
    }));

    sendEventClickAction(pianoPageConfig, {
      clickText: children,
      clickTarget: quizContext.question,
    });
  }, [id, quizContext, globalQuizContext, correct, pianoPageConfig, children]);

  const icon = useMemo(() => (correct ? <Checkmark /> : <Cross />), [correct]);

  return (
    <div
      className={classNames(
        styles.answer,
        selected && styles.selected,
        correct && styles.correct,
        quizContext.answered && styles.answered,
        !(selected || correct) && styles.faded,
      )}
    >
      <button onClick={selectCallback} disabled={quizContext.answered}>
        {quizContext.answered && (selected || correct) && icon}
        <span>{children}</span>
      </button>
    </div>
  );
};

export const Result = ({ children }) => {
  const quizContext = useContext(QuizContext);
  const confirmed = quizContext.answered;

  return (
    <div className={classNames(styles.result, confirmed && styles.shown)}>
      <div className={styles.text} aria-hidden={confirmed ? "false" : "true"}>
        {Array.isArray(children) ? (
          children.map((child, index) =>
            typeof child === "string" ? (
              <ReactMarkdown key={index} source={child} linkTarget="_blank" />
            ) : (
              <React.Fragment key={index}>{child}</React.Fragment>
            ),
          )
        ) : (
          <ReactMarkdown source={children} linkTarget="_blank" />
        )}
      </div>
    </div>
  );
};

export const Score = ({ images, texts }) => {
  const globalQuizContext = useContext(GlobalQuizContext);

  const score = useMemo(() => {
    const score = Object.values(globalQuizContext.score).filter(
      (_) => _,
    ).length;
    return score;
  }, [globalQuizContext.score]);

  const currentImage = useMemo(
    () =>
      Object.entries(images).reduce(
        (acc, [requiredScore, url]) => {
          requiredScore = parseInt(requiredScore);

          if (
            score >= requiredScore &&
            (acc.url === null || requiredScore > (acc.requiredScore || 0))
          ) {
            return { url, requiredScore: requiredScore };
          } else {
            return acc;
          }
        },
        { url: null, requiredScore: null },
      ),
    [images, score],
  );

  const currentText = useMemo(
    () =>
      texts &&
      Object.entries(texts).reduce(
        (acc, [requiredScore, text]) => {
          requiredScore = parseInt(requiredScore);

          if (
            score >= requiredScore &&
            (acc.text === null || requiredScore > (acc.requiredScore || 0))
          ) {
            return { text, requiredScore };
          } else {
            return acc;
          }
        },
        { text: null, requiredScore: null },
      ),
    [texts, score],
  );

  // Hide score until button is clicked
  const [hidden, setHidden] = useState(true);

  const pianoPageConfig = usePageConfig();
  const onRevealClick = useCallback(() => {
    setHidden(false);

    sendEventClickAction(pianoPageConfig, {
      clickText: "Ergebnis anzeigen",
      clickTarget: `${score}`,
    });
  }, [setHidden, pianoPageConfig, score]);

  return (
    <div className={classNames(styles.score, hidden && styles.hidden)}>
      <button
        className={classNames(styles.scoreShow, !hidden && styles.hidden)}
        onClick={onRevealClick}
        aria-hidden={!hidden ? "true" : "false"}
      >
        Ergebnis anzeigen
      </button>
      <div
        className={classNames(styles.image, styles.hidden)}
        style={{ backgroundImage: `url('${currentImage.url}')` }}
      ></div>
      <div
        className={classNames(styles.scoreBoard, styles.hidden)}
        aria-hidden={hidden ? "true" : "false"}
      >
        <div className={styles.scoreNumbers}>
          <span className={styles.scoreCorrect}>{score}</span>
          <span className={styles.scoreMax}>
            {" "}
            / {Object.keys(globalQuizContext.score).length}
          </span>
        </div>
        <div>
          <span className={styles.scorePost}>{currentText.text}</span>
        </div>
      </div>
      <div className={styles.scoreImagePrefetch}>
        {Object.entries(images).map(([requiredScore, url]) => (
          <img key={url} src={url} alt="" />
        ))}
      </div>
    </div>
  );
};
