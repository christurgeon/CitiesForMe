import { CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import { useContext } from 'react'
import QuizContext from '../contexts/QuizContext'
import 'pure-react-carousel/dist/react-carousel.es.css'

const skeletonQuestion = {
  name: '',
}

export default function ProgressSlider() {
  const { quizContext } = useContext(QuizContext)
  const questions = [
    skeletonQuestion,
    ...quizContext.questions,
    skeletonQuestion,
  ]
  function getPosition(index) {
    if (index === quizContext.currentQuestionIndex) {
      return 'text-left'
    }
    if (index === quizContext.currentQuestionIndex + 1) {
      return 'text-center'
    }
    if (index === quizContext.currentQuestionIndex + 2) {
      return 'text-right'
    }
    return ''
  }
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={150}
      totalSlides={questions.length}
      isIntrinsicHeight
      visibleSlides={3}
      currentSlide={quizContext.currentQuestionIndex}
      dragEnabled={false}
    >
      <div className='w-full inline-block'>
        <Slider>
          {questions.map((question, index) => (
            <Slide className='slide' index={index} key={index}>
              <div className={`flex flex-col uppercase font-display `}>
                <div className={`font-medium text-2xl ${getPosition(index)}`}>
                  <span>{question.name}</span>
                </div>
              </div>
            </Slide>
          ))}
        </Slider>
      </div>
    </CarouselProvider>
  )
}
