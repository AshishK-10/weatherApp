import React from 'react'
import {formatToLocalTime} from '../weatherApiFunctions/weatherApi'

function TimeandLocation({weather: {dt, timezone, name, country}}) {
  return (
    <div>
      <div className='flex flex-row items-center justify-center my-6'>
        <p className='text-white text-xl font-extralight'>
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className=' flex justify-center items-center my-3'>
        <p className=' text-white font-medium text-3xl'>{`${name}, ${country}`}</p>

      </div>
    </div>
  )
}

export default TimeandLocation