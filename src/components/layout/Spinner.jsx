import React from 'react'
import spinner from './assets/spinner-1.gif'

function Spinner() {
  return (
      <div className="w-100 mt-20">
        <img 
            width={180}
            src={spinner}
            className='text-center mx-auto'
            alt="Loading"
        />
      </div>
  )
}

export default Spinner