import React from 'react'
import KeyandValueIcons from './KeyandValueIcons'
import { getIcon } from '../weatherApiFunctions/weatherApi';
import utils from '../utils';

function TemperatureandDetails({weather: {details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone}}) {

  const iconData = utils().iconData(feels_like, humidity, speed);
  const weatherInfoData = utils().weatherInfoData(sunrise, sunset, temp_max, temp_min, timezone);

  return (
    <div>
      <div className='flex justify-center items-center py-6 text-xl text-cyan-300'>
        <p>{details}</p>
      </div>
      <div className='flex flex-row justify-between items-center text-white py-3'>
        <img src = {getIcon(icon)} className='w-20' alt=''/>
        <p className=' text-5xl'>{`${temp.toFixed(0)}°`}</p>
        <div className='flex flex-col space-y-2'>
          {
            iconData.map((data, index)=>{
              return <KeyandValueIcons key = {index} child = {data.icon} title = {data.title} value = {data.value}/>
            })
          }
        </div>
      </div>
      <div className='flex flex-row items-center justify-center text-white text-sm py-3 space-x-2'>
        {
          weatherInfoData.map((data, index)=>{
            return (
              <span className='flex flex-row space-x-2' key={index}>
                <KeyandValueIcons child = {data.icon} title = {data.title} value = {data.value}/>
                {data.isP && <p className='font-light '>|</p>}
              </span>
            )
          })
        }
      </div>
    </div>
  )
}

export default TemperatureandDetails