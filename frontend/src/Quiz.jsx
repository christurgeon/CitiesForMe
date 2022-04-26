import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import { useContext, useState, useCallback } from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'
import Question from './components/Question'
import ProgressSlider from './components/ProgressSlider'
import QuizContext from './contexts/QuizContext'
import ResultsMap from './ResultsMap'

export default function Quiz() {
  const { quizContext, setQuizContext } = useContext(QuizContext)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const payload = {
    surveyCriteria: [],
    surveyVals: [],
  }
  function completeQuiz() {
    console.log("complete quiz called")
    Object.keys(quizContext.responses).forEach((key) => {
      payload.surveyCriteria.push(key)
      payload.surveyVals.push(quizContext.responses[key])
    })
    console.log(payload)
    axios.post('http://localhost:5001/api/v1/Surveys', payload).then(
      (response) => {
        setQuizContext({
          ...quizContext,
          results: response.data,
          showResults: true,
        })
        forceUpdate()
      },
      (error) => {
        console.error(error)
      }
    )
  }

  function handleSkip() {
    const nextIndex = quizContext.currentQuestionIndex++
    const newQuizContext = {
      currentQuestionIndex: nextIndex,
      ...quizContext,
    }
    /* Remove skipped question from response data */
    delete newQuizContext[quizContext[newQuizContext.currentQuestionIndex]]
    setQuizContext(newQuizContext)
  }

  function skipButton() {
    if (quizContext.currentQuestionIndex + 1 < quizContext.questions.length) {
      return (
        <ButtonNext
          className='font-display text-xl focus:outline-none uppercase border-2 rounded-xl bg-green-lightest py-1 px-5'
          onClick={handleSkip}
        >
          <span>Skip</span>
        </ButtonNext>
      )
    }
    return <></>
  }

  function handleNext() {
    const nextIndex = quizContext.currentQuestionIndex++
    const newQuizContext = {
      currentQuestionIndex: nextIndex,
      ...quizContext,
    }
    setQuizContext(newQuizContext)
  }

  function handleBack() {
    setQuizContext({
      currentQuestionIndex: quizContext.currentQuestionIndex--,
      ...quizContext,
    })
  }

  /*
  const resultsPanel = (
    <div className='w-full h-full bg-mint pt-8'>
      <div className='max-w-4xl m-auto'>
        {quizContext.results.map((result, index) => (
          <div key={index}>
            <span>{`${index + 1}:  ${result.cityName}, ${result.state}`}</span>
          </div>
        ))}
      </div>
    </div>
  )
  */
  const quizPanel = (
    <div className='w-full h-full bg-mint pt-8'>
      <div className='max-w-4xl m-auto'>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={150}
          totalSlides={quizContext.questions.length}
          isIntrinsicHeight
          dragEnabled={false}
        >
          <div className='w-full inline-block'>
            <Slider>
              {quizContext.questions.map((question, index) => (
                <Question index={index} key={index} spec={question} />
              ))}
            </Slider>
          </div>
          <div className='flex flex-row flex-wrap w-full justify-center'>
            Feel free to skip questions that aren&apos;t important to you.
          </div>
          <div className='flex w-full py-4'>
            <div className='w-1/3 text-left'>
              <ButtonBack
                className='font-display text-xl focus:outline-none uppercase border-2 rounded-xl bg-green-lightest py-1 px-5'
                onClick={handleBack}
              >
                <span>Back</span>
              </ButtonBack>
            </div>
            <div className='w-1/3 text-center'>{skipButton()}</div>
            <div
              className='w-1/3 text-right'
              role='button'
              tabIndex={0}
              onClick={() => {
                if (
                  quizContext.currentQuestionIndex >=
                  quizContext.questions.length-1
                ) {
                  completeQuiz()
                } else {
                  handleNext()
                }
              }}
              onKeyDown={() => {
                if (
                  quizContext.currentQuestionIndex >=
                  quizContext.questions.length-1
                ) {
                  completeQuiz()
                } else {
                  handleNext()
                }
              }}
            >
              <ButtonNext className='font-display text-xl focus:outline-none uppercase border-2 rounded-xl bg-green-lightest py-1 px-5'>
                <span>
                  {(quizContext.currentQuestionIndex >= quizContext.questions.length-1) ? 'Complete Quiz' : 'Next'}
                </span>
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>
        <ProgressSlider currentIndex={0} questions={quizContext.questions} />
      </div>
    </div>
  )
  if (quizContext.showResults === true) {
    console.log(quizContext.results)
    return <ResultsMap results={quizContext.results} />
  }
  return quizPanel
}
