import React from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import siteBackgroundFull from '../assets/images/background/site-background-full.webp'
import siteBackgroundSmall from '../assets/images/background/site-background-small.webp'

const BackgroundDisplay = () => {
  return (
    <div className='fixed inset-0 z-0'>

      <ProgressiveImage src={siteBackgroundFull} placeholder={siteBackgroundSmall}>
          {(src, loading) => (
              <img
                  src={src}
                  alt={"Site Background"}
                  className={`w-full h-full object-cover object-left duration-300 ${loading ? 'blur-sm' : 'blur-0'}`}
              />
          )}
      </ProgressiveImage>

      <div className="star-field">
          {/* <!-- Top Left --> */}
          <div className="layer topLeft"></div>
          <div className="layer topLeft"></div>
          <div className="layer topLeft"></div>
          <div className="layer topLeft"></div>
          {/* <!-- Top Right --> */}
          <div className="layer topRight"></div>
          <div className="layer topRight"></div>
          <div className="layer topRight"></div>
          <div className="layer topRight"></div>
          {/* <!-- Bottom Left --> */}
          <div className="layer bottomLeft"></div>
          <div className="layer bottomLeft"></div>
          <div className="layer bottomLeft"></div>
          <div className="layer bottomLeft"></div>
          {/* <!-- Bottom Right --> */}
          <div className="layer bottomRight"></div>
          <div className="layer bottomRight"></div>
          <div className="layer bottomRight"></div>
          <div className="layer bottomRight"></div>
      </div>      
    </div>
  )
}

export default BackgroundDisplay
