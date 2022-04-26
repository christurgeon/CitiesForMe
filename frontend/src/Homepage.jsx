import { useContext } from 'react'
import BannerImage from './components/BannerImage'
import AppContext from './contexts/AppContext'

export default function Homepage() {
  const { appContext, setAppContext } = useContext(AppContext)

  return (
    <BannerImage
      imagePath='./assets/ChicagoV2_Cropped.jpg'
      mobileImagePath='./assets/ChicagoV3_Cropped_Mobile.jpg'
    >
      <div className='flex h-full mx-4'>
        <div className='m-auto items-center gaussian-blur rounded-2xl'>
          <div className='flex-col text-center'>
            <span className='font-display font-bold sm:text-6xl text-4xl uppercase'>
              Where is your next move?
            </span>
          </div>
          <div className='flex-col text-center py-2'>
            <span className='font-body sm:text-2xl text-lg'>
              Get the data you need to find the best home for you
            </span>
          </div>
          <div className='flex-col text-center py-2'>
            <div>
              <button
                className='font-display focus:outline-none text-xl uppercase border-2 rounded-xl bg-green-lightest py-3 px-4'
                type='button'
                onClick={() => {
                  setAppContext({ ...appContext, quizOpen: true })
                }}
              >
                <span>Take the Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BannerImage>
  )
}
