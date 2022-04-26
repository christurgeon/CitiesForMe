import { useContext } from 'react'
import Navbar from './components/Navbar'
import Homepage from './Homepage'
import Footer from './components/Footer'

import AppContext from './contexts/AppContext'
import Quiz from './Quiz'
import CityRating from './CityRating'
import QuizContextProvider from './providers/QuizContextProvider'
import CityRatingContextProvider from './providers/CityRatingContextProvider'

function App() {
  const { appContext } = useContext(AppContext)
  let body = <Homepage />
  if (appContext.quizOpen === true) {
    body = (
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    )
  }
  if (appContext.rateOpen === true) {
    body = (
      <CityRatingContextProvider>
        <CityRating />
      </CityRatingContextProvider>
    )
  }
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      {body}
      <Footer />
    </div>
  )
}

export default App
