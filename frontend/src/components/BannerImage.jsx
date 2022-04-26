import Media from 'react-media'
import PropTypes from 'prop-types'

export default function BannerImage(props) {
  const { imagePath } = props
  const { mobileImagePath } = props
  const BannerStyle = {
    backgroundImage: `url(${imagePath})`,
  }
  const BannerStyleMobile = {
    backgroundImage: `url(${mobileImagePath})`,
  }
  return (
    <div className='flex-grow items-center justify-center'>
      <Media queries={{ mobile: '(max-width: 640px)' }}>
        {/* Media query is used to dynamically source the cover image */}
        {(matches) => (
          <div
            className='min-h-320 h-full bg-no-repeat bg-left-bottom bg-cover'
            style={matches.mobile ? BannerStyleMobile : BannerStyle}
          >
            {props.children}
          </div>
        )}
      </Media>
    </div>
  )
}

BannerImage.propTypes = {
  imagePath: PropTypes.string.isRequired,
  mobileImagePath: PropTypes.string.isRequired,
  children: PropTypes.element,
}
BannerImage.defaultProps = {
  children: null,
}
