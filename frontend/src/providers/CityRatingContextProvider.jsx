import { useState } from 'react'
import PropTypes from 'prop-types'
import CityRatingContext from '../contexts/CityRatingContext'
import Questions from '../questions/cityrating/CityRatingQuestionLoader'

const CityRatingContextProvider = ({ children }) => {
  const [cityRatingContext, setCityRatingContext] = useState({
    questions: Questions,
    currentQuestionIndex: 0,
    responses: {},
    done: false,
  })
  const defaultContext = {
    cityRatingContext,
    setCityRatingContext,
  }
  return (
    <CityRatingContext.Provider value={defaultContext}>
      {children}
    </CityRatingContext.Provider>
  )
}

CityRatingContextProvider.propTypes = {
  children: PropTypes.element,
}
CityRatingContextProvider.defaultProps = {
  children: null,
}

export default CityRatingContextProvider
