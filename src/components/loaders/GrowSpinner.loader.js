import React from 'react'

const GrowSpinnerLoader = ({text}) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-column ">
                <div
                  className="spinner-grow spinner-grow-md text-pro-secondary"
                  role="status"
                ></div>
              </div>
              <div className="text-center small mt-3">
                {text}
              </div>
    </>
  )
}

export default GrowSpinnerLoader;