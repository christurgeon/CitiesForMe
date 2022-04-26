import React, { useContext } from 'react'
import AppIcon from './AppIcon'
import './Navbar.scss'
import AppContext from '../contexts/AppContext'

export default function Navbar() {
  const { appContext, setAppContext } = useContext(AppContext)
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-sm bg-white border-b border-green-dark shadow-xl'>
        <div className='container px-4 mx-auto flex flex-wrap items-center'>
          <div className='w-full relative flex sm:w-1/3 sm:static sm:block hidden'>
            <AppIcon />
          </div>

          <div 
            className='w-1/2 relative flex sm:w-1/3 sm:static sm:block text-center'
          >
            <span
              className='lg:text-4xl sm:text-3xl text-2xl text-green-darkest font-display font-medium leading-relaxed inline-block sm:py-2 py-0 whitespace-no-wrap'
            >
              CitiesForMe
            </span>
          </div>
          <div className='w-1/2 relative flex sm:w-1/3 sm:hidden justify-end'>
            <button
              className='font-medium navbar-text text-black cursor-pointer px-3 py-1 border border-solid border-green-darkest rounded-xl block sm:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              Menu
            </button>
          </div>
          <div
            className={`sm:flex justify-center sm:w-1/3 w-full ${
              navbarOpen ? ' flex' : ' hidden'
            }`}
          >
            <ul className='flex flex-col sm:flex-row list-none sm:ml-auto items-center'>
              <li className='flex sm:mr-2 sm:mt-auto mt-3'>
                <button
                  className='navbar-text focus:outline-none sm:flex sm:border-2 sm:rounded-xl sm:bg-green-lightest'
                  type='button'
                  onClick={() => {
                    setAppContext({ ...appContext, rateOpen: true })
                  }}
                >
                  <span>Rate Your City</span>
                </button>
              </li>
              <li className='flex sm:mr-2 sm:mt-auto mt-3'>
                <button
                  className='navbar-text focus:outline-none sm:flex sm:border-2 sm:rounded-xl sm:bg-green-lightest'
                  type='button'
                  onClick={() => {
                    setAppContext({ ...appContext, quizOpen: true })
                  }}
                >
                  <span>Take the Quiz</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
