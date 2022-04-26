import { useState } from 'react'
import PropTypes from 'prop-types'
import QuizContext from '../contexts/QuizContext'
import Questions from '../questions/quiz/QuestionLoader'

const QuizContextProvider = ({ children }) => {
  const [quizContext, setQuizContext] = useState({
    questions: Questions,
    currentQuestionIndex: 0,
    responses: {},
    results: [],
    showResults: false,
  })
  const defaultContext = {
    quizContext,
    setQuizContext,
  }
  return (
    <QuizContext.Provider value={defaultContext}>
      {children}
    </QuizContext.Provider>
  )
}

QuizContextProvider.propTypes = {
  children: PropTypes.element,
}
QuizContextProvider.defaultProps = {
  children: null,
}

export default QuizContextProvider
