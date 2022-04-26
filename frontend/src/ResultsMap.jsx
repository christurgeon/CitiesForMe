import { useState } from 'react'
import PropTypes from 'prop-types'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
// props.results = {zipcode: "38506", state: "TN", cityName: "Cookeville", longitude: -85.5114, latitude: 36.1484}
const key = 'AIzaSyCthEfL4mx1NF__6Sysgip88CojQFFKgus'

function ResultsMap(props) {
  const { results, google } = props
  const markers = []
  const [activeMarker, setActiveMarker] = useState()
  const [activeProps, setActiveProps] = useState()
  const [openModal, setOpenModal] = useState(false)

  const onMarkerClick = (newProps, marker) => {
    setActiveMarker(marker)
    setActiveProps(newProps)
    setOpenModal(true)
  }
  const onClose = () => {
    setOpenModal(false)
  }

  const bounds = new google.maps.LatLngBounds()
  for (let i = 0; i < results.length; i++) {
    const marker = (
      <Marker
        name={`${results[i].cityName}, ${results[i].state}`}
        zip={results[i].zipcode}
        onClick={onMarkerClick}
        position={{ lat: results[i].latitude, lng: results[i].longitude }}
      />
    )
    markers.push(marker)
    const entry = {
      lat: results[i].latitude,
      lng: results[i].longitude,
    }
    bounds.extend(entry)
  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Map
        google={google}
        zoom={4.95}
        initialCenter={{
          lat: 38.9014386,
          lng: -95.7922559,
        }}
      >
        {markers}
        <InfoWindow marker={activeMarker} onClose={onClose} visible={openModal}>
          <div>
            <h1>{openModal ? activeProps.name : ''}</h1>
            <p>
              <a
                href={`https://www.zillow.com/homes/${
                  openModal ? activeProps.zip : ''
                }_rb/`}
                target='_new'
              >
                View Zillow Listings
              </a>
            </p>
          </div>
        </InfoWindow>
      </Map>
    </div>
  )
}
export default GoogleApiWrapper({
  apiKey: key,
})(ResultsMap)

// props.results = {zipcode: "38506", state: "TN", cityName: "Cookeville", longitude: -85.5114, latitude: 36.1484}
ResultsMap.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      zipcode: PropTypes.string,
      state: PropTypes.string,
      cityName: PropTypes.string,
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    })
  ).isRequired,
  google: PropTypes.shape({
    // Injected by GoogleApiWrapper in export statement
    maps: PropTypes.shape({
      LatLngBounds: PropTypes.func,
    }).isRequired,
  }).isRequired,
}
