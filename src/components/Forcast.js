import React from 'react'
import { getIcon } from '../weatherApiFunctions/weatherApi'

function Forcast({title, items, icon}) {
  return (
    <div>
      <div className='flex justify-start items-center mt-6'>
        <p className=' text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-2'></hr>
      <div className='flex flex-row items-center justify-between text-white'>
        {
          items.map((item, index)=>{
            return(
              <div className='flex flex-col items-center justify-center' key={index}>
                <p className='font-light text-sm'>{item.daytime}</p>
                <img src = {getIcon(icon)} className='w-12 my-1'/>
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Forcast