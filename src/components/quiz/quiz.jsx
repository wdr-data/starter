import React, { useMemo } from 'react'
import { useCallback, useState, useContext } from 'react'
import classNames from 'class-names'
import ReactMarkdown from 'react-markdown'
import { v4 as uuid } from 'uuid'

import styles from './quiz.module.css'

const QuizContext = React.createContext({
  selectedAnswer: null,
  setSelectedAnswer: () => {},
})

export const Quiz = ({ children }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  const quizContext = useMemo(
    () => ({ selectedAnswer, setSelectedAnswer, answered, setAnswered }),
    [selectedAnswer, setSelectedAnswer, answered, setAnswered],
  )

  return (
    <QuizContext.Provider value={quizContext}>
      <div className={styles.quiz}>{children}</div>
    </QuizContext.Provider>
  )
}

export const Question = ({ children }) => {
  return (
    <div className={styles.question}>
      <ReactMarkdown source={children} />
    </div>
  )
}

const Checkmark = () => (
  <div class={styles.icon}>
    <svg viewBox="0 0 32 32" aria-label="Richtige Antwort">
      <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
    </svg>
  </div>
)

const Cross = () => (
  <div class={styles.icon}>
    <svg viewBox="0 0 32 32" aria-label="Falsche Antwort">
      <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
    </svg>
  </div>
)

export const Answer = ({ correct, children }) => {
  const [id] = useState(uuid())
  const quizContext = useContext(QuizContext)

  const selected = quizContext.selectedAnswer === id

  const selectCallback = useCallback(() => {
    quizContext.setSelectedAnswer(id)
  }, [id, quizContext])

  const icon = useMemo(() => (correct ? <Checkmark /> : <Cross />), [correct])

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
        {children}
      </button>
    </div>
  )
}

export const Result = ({ children }) => {
  const quizContext = useContext(QuizContext)

  const confirmAllowed = quizContext.selectedAnswer !== null
  const confirmed = quizContext.answered
  const confirmHandler = useCallback(() => {
    quizContext.setAnswered(true)
  }, [quizContext])

  return (
    <div
      className={classNames(
        styles.result,
        confirmAllowed && styles.finished,
        confirmed && styles.shown,
      )}
    >
      <div className={styles.actionContainer}>
        <button
          className={styles.showAction}
          disabled={!confirmAllowed || confirmed}
          onClick={confirmHandler}
        >
          Antworten
        </button>
      </div>
      <div className={styles.text} hidden={!confirmed} aria-hidden={confirmed ? "false" : "true"}>
        <ReactMarkdown source={children} linkTarget="_blank" />
      </div>
    </div>
  )
}
