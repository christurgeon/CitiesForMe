import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import { useContext } from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css'
import axios from 'axios'
import CityRatingQuestion from './components/CityRatingQuestion'
import CityRatingProgressSlider from './components/CityRatingProgressSlider'
import CityRatingContext from './contexts/CityRatingContext'

export default function CityRating() {
  const { cityRatingContext, setCityRatingContext } = useContext(
    CityRatingContext
  )

  /* axios.get('http://localhost:5001/api/v1/cities').then(function (response) {
    for (let i = 0; i < response.data.length; i++) {
      let zip = response.data[i].zipcode;
      let city = response.data[i].cityName + ', ' + response.data[i].state;
      cities.push(<Option value={zip}>
        {city}
      </Option>);
      
    }
    setCityRatingContext({
      ...cityRatingContext,
      cities: cities,
    });
    setLoading(false);
  }); */
  const payload = {
    cityRatings: [],
  }
  function completeRating() {
    const cityRating = {
      zipcode: '',
      criteria: [],
      ratings: [],
    }
    let setZipCode = false
    Object.keys(cityRatingContext.responses).forEach((key) => {
      if (!setZipCode) {
        cityRating.zipcode = cityRatingContext.responses[key]
        setZipCode = true
      } else {
        cityRating.criteria.push(key)
        cityRating.ratings.push(cityRatingContext.responses[key])
      }
    })
    payload.cityRatings.push(cityRating)
    axios
      .post('http://localhost:5001/api/v1/Ratings', payload)
      .then(
        setCityRatingContext({
          ...cityRatingContext,
          done: true,
        })
      )
      .catch(() => {
        /* Fail silently when ratings are submitted for a zip code we don't track */
      })
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

  function validateZipCode() {
    if (cityRatingContext.questions[0] !== undefined) {
      const zipcode =
        cityRatingContext.responses[cityRatingContext.questions[0].name]
      if (zipcode !== undefined && zipcode.match('^[0-9]{5}$')) {
        return true
      }
    }
    return false
  }

  function skipButton() {
    if (
      cityRatingContext.currentQuestionIndex + 1 <
      cityRatingContext.questions.length
    ) {
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
    if (validateZipCode()) {
      const nextIndex = cityRatingContext.currentQuestionIndex++
      const newCityRatingContext = {
        currentQuestionIndex: nextIndex,
        ...cityRatingContext,
      }
      setCityRatingContext(newCityRatingContext)
    }
  }

  function handleBack() {
    setCityRatingContext({
      currentQuestionIndex: cityRatingContext.currentQuestionIndex--,
      ...cityRatingContext,
    })
  }

  const donePanel = (
    <div className='w-full h-full bg-mint pt-8'>
      <div className='flex-col text-center'>
        <span className='font-body sm:text-2xl text-lg'>
          Thank you for your ratings!
        </span>
      </div>
    </div>
  )

  const cityRatingPanel = (
    <div className='w-full h-full bg-mint pt-8'>
      <div className='max-w-4xl m-auto'>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={150}
          totalSlides={cityRatingContext.questions.length}
          isIntrinsicHeight
          dragEnabled={false}
        >
          <div className='w-full inline-block'>
            <Slider>
              {cityRatingContext.questions.map((question, index) => (
                <CityRatingQuestion
                  index={index}
                  key={index}
                  spec={question}
                  defaultValue={index === 0 ? '' : 50}
                />
              ))}
            </Slider>
          </div>
          {cityRatingContext.currentQuestionIndex > 0 ? (
            <div className='flex flex-row flex-wrap w-full justify-center'>
              Feel free to skip questions that you aren&apos;t sure about.
            </div>
          ) : (
            !validateZipCode() && (
              <div className='flex flex-row flex-wrap w-full justify-center'>
                Please enter a valid city.
              </div>
            )
          )}
          <div className='flex w-full py-4'>
            <div className='w-1/3 text-left'>
              <ButtonBack
                className='font-display text-xl focus:outline-none uppercase border-2 rounded-xl bg-green-lightest py-1 px-5'
                onClick={handleBack}
              >
                <span>Back</span>
              </ButtonBack>
            </div>
            <div className='w-1/3 text-center'>
              {cityRatingContext.currentQuestionIndex > 0 && skipButton()}
            </div>
            <div
              className='w-1/3 text-right'
              role='button'
              tabIndex={0}
              onClick={() => {
                handleNext()
                if (
                  cityRatingContext.currentQuestionIndex >=
                  cityRatingContext.questions.length
                ) {
                  completeRating()
                }
              }}
              onKeyDown={() => {
                handleNext()
                if (
                  cityRatingContext.currentQuestionIndex >=
                  cityRatingContext.questions.length
                ) {
                  completeRating()
                }
              }}
            >
              <ButtonNext
                className='font-display text-xl focus:outline-none uppercase border-2 rounded-xl bg-green-lightest py-1 px-5'
                disabled={!validateZipCode()}
              >
                <span>Next</span>
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>
        <CityRatingProgressSlider
          currentIndex={0}
          questions={cityRatingContext.questions}
        />
      </div>
    </div>
  )
  if (cityRatingContext.done === true) {
    return donePanel
  }
  return cityRatingPanel
}
