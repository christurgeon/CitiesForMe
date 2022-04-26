import { Slide } from 'pure-react-carousel'
import PropTypes from 'prop-types'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useState, useContext } from 'react'
import QuizContext from '../contexts/QuizContext'

export default function Question(props) {
  const { index, spec } = props
  const { quizContext, setQuizContext } = useContext(QuizContext)
  const [questionValue, setQuestionValue] = useState(50)

  function handleSliderChange(event) {
    const newResponses = quizContext.responses
    newResponses[quizContext.questions[quizContext.currentQuestionIndex].name] =
      event.target.value / 100
    setQuizContext({
      responses: newResponses,
      ...quizContext,
    })
    setQuestionValue(event.target.value)
  }
  return (
    <Slide className='flex slide p-4 outline-none' index={index}>
      <div className='m-4'>
        <div className='flex flex-row flex-wrap w-full'>
          <div className='flex flex-col w-full flex-1'>
            <div className='blue-column'>
              <div className='flex flex-row flex-wrap w-full justify-center'>
                <span className='sm:text-2xl font-bold text-lg'>
                  {spec.question}
                </span>
              </div>
              <div className='flex flex-row flex-wrap w-full justify-center'>
                <span className='sm:text-xl text-base'>{spec.subquestion}</span>
              </div>
              <div className='flex flex-row flex-wrap w-full h-14'>
                <div className='flex flex-col w-full flex-1 pr-2'>
                  <span className='h-full flex uppercase font-display items-center content-center justify-end'>
                    {spec.leftLabel}
                  </span>
                </div>
                <div className='flex flex-col w-full flex-1 justify-center content-center align-middle'>
                  <input
                    className='w-full'
                    id='typeinp'
                    type='range'
                    min='0'
                    max='100'
                    value={questionValue}
                    onChange={handleSliderChange}
                    step='1'
                  />
                </div>
                <div className='flex flex-col w-full flex-1 pl-2'>
                  <span className='h-full flex uppercase font-display items-center content-center'>
                    {spec.rightLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}

Question.propTypes = {
  spec: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    rightLabel: PropTypes.string,
    leftLabel: PropTypes.string,
    question: PropTypes.string,
    subquestion: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
}
