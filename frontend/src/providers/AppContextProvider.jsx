import { useState } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../contexts/AppContext'

const AppContextProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    quizOpen: false,
  })
  const defaultContext = {
    appContext,
    setAppContext,
  }
  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
}
AppContextProvider.defaultProps = {
  children: null,
}

export default AppContextProvider
