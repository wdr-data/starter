import React, {useState, useMemo} from 'react';

export const GlobalQuizContext = React.createContext({});

export const useQuizContext = () => {
    const [score, setScore] = useState({})
    const context = useMemo(() => ({
      score,
      setScore
    }), [score, setScore])

    return context
  }
