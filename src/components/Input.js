import React, { useState } from 'react'
import { UilSearch, UilLocationPoint,  } from '@iconscout/react-unicons'

export default function Input({setQuery, units, setUnits, setIsCoord}) {
  const [city, setCity] = useState('')

  const HandleSearchCity = ()=>{
    if(city != '') setQuery({q: city})
  }

  const HandleLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        setIsCoord(true)
        setQuery({
          lat,
          lon
        })
      })
    }
  }

  const handleUnitChange = (e)=>{
    let newUnit = e.target.name;
    if(newUnit === units) return;
    setUnits(newUnit);
  }

  return (
    <div className='flex flex-row justify-center my-6'>

      <div className='flex flex-row justify-center space-x-4 items-center w-3/4'>
        <input type = "text"
         value={city}
         onChange={(e)=>setCity(e.target.value)}
         className='text-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
          placeholder='search city...'
        />

        <UilSearch size = {25}
         onClick = {HandleSearchCity}
         className = "text-white cursor-pointer transition ease-out hover:scale-125"
        />

        <UilLocationPoint size = {25}
        onClick = {HandleLocation}
        className = "text-white cursor-pointer transition ease-out hover:scale-125"/>
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>

        <button name='metric'
        className=' text-xl font-light text-white transition ease-out hover:scale-125'
        onClick={handleUnitChange}
        >
          °C
        </button>

        <p className=' mx-1 text-white'>|</p>

        <button name='imperial'
        className=' text-xl font-light text-white transition ease-out hover:scale-125'
        onClick={handleUnitChange}
        >
          °F
        </button>
      </div>

    </div>
  )
}
