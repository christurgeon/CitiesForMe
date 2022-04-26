import axios from 'axios'
import { Slide } from 'pure-react-carousel'
import PropTypes from 'prop-types'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useState, useContext } from 'react'
import { Select } from 'antd'
import CityRatingContext from '../contexts/CityRatingContext'
import 'antd/dist/antd.css'

const { Option } = Select
export default function CityRatingQuestion(props) {
  const { index, spec, defaultValue } = props
  const { cityRatingContext, setCityRatingContext } = useContext(
    CityRatingContext
  )
  const [questionValue, setQuestionValue] = useState(defaultValue)
  const [cityOptions, setCityOptions] = useState()
  const [selectedCity, setSelectedCity] = useState('')

  async function handleSearch(event) {
    const newEvent = event.length === 0 ? 'A' : event
    const query = newEvent.charAt(0).toUpperCase() + newEvent.slice(1)
    const url = `http://localhost:5001/api/v1/cities/query/${query}`
    await axios.get(url).then((response) => {
      const options = []
      for (let i = 0; i < response.data.length; i++) {
        options.push(
          <Option
            key={response.data[i].zipcode}
            value={`${response.data[i].cityName}, ${response.data[i].state}`}
          />
        )
      }
      setCityOptions(options)
    })
  }

  function handleSliderChange(event) {
    const newResponses = cityRatingContext.responses

    newResponses[
      cityRatingContext.questions[cityRatingContext.currentQuestionIndex].name
    ] = event.target.value / 100
    setCityRatingContext({
      responses: newResponses,
      ...cityRatingContext,
    })
    setQuestionValue(event.target.value)
  }

  function handleTextChange(event, option) {
    const newResponses = cityRatingContext.responses
    newResponses[
      cityRatingContext.questions[cityRatingContext.currentQuestionIndex].name
    ] = option.key
    setCityRatingContext({
      responses: newResponses,
      ...cityRatingContext,
    })
    setQuestionValue(option.key)
    setSelectedCity(option.value)
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
                <span className=''>{spec.subquestion}</span>
              </div>
              <div className='flex flex-row flex-wrap w-full h-14'>
                <div className='flex flex-col w-full flex-1 pr-2'>
                  <span className='h-full flex uppercase font-display items-center content-center justify-end'>
                    {spec.leftLabel}
                  </span>
                </div>
                <div className='flex flex-col w-full flex-1 justify-center content-center align-middle'>
                  {spec.type === 'slider' ? (
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
                  ) : (
                    <div>
                      <Select
                        className='w-full focus:outline-none border-2 border-green-darkest rounded-xl py-2 px-5'
                        showSearch
                        onSelect={handleTextChange}
                        showArrow={false}
                        onSearch={handleSearch}
                        autoClearSearchValue={false}
                      >
                        {cityOptions}
                      </Select>

                      <div style={{ fontSize: 'large', textAlign: 'center' }}>
                        Selected city: {selectedCity}
                      </div>
                    </div>
                  )}
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

CityRatingQuestion.propTypes = {
  spec: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    rightLabel: PropTypes.string,
    leftLabel: PropTypes.string,
    question: PropTypes.string,
    subquestion: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.any.isRequired,
}
