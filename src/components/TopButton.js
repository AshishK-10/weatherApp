import React from 'react'
import utils from '../utils'

export default function TopButton({setQuery}) {
  const data = utils().countries();

  return (
    <div className="flex items-center justify-around my-6">
      {
        data.map((d)=>{
          return(
            <button key = {d.id} className='text-white text-lg font-medium' onClick={(e)=>setQuery({q: d.title})}>
              {d.title}
            </button>
          )
        })
      }
    </div>
  )
}
