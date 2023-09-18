import React from 'react';
import { UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset } from '@iconscout/react-unicons'
import { formatToLocalTime } from './weatherApiFunctions/weatherApi';

function utils(){
  function iconData(feels_like, humidity, speed){
    return [
      {
        icon: <UilTemperature size={18} className="mr-1" />,
        title: "Real fell",
        value: `${feels_like.toFixed(0)}°`,
      },
      {
        icon: <UilTear size={18} className="mr-1" />,
        title: "Humidity",
        value: `${humidity.toFixed(0)}%`,
      },
      {
        icon: <UilWind size={18} className="mr-1" />,
        title: "Wind",
        value: `${speed.toFixed(0)}km/h`,
      },
    ];
  }

  function weatherInfoData(sunrise, sunset, temp_max, temp_min, timezone) {
    return [
      {
        icon: <UilSun size={18} className="mr-1" />,
        title: "Rise",
        value: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        isP: true,
      },
      {
        icon: <UilSun size={18} className="mr-1" />,
        title: "Set",
        value: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        isP: true,
      },
      {
        icon: <UilArrowUp size={18} className="mr-1" />,
        title: "High",
        value: `${temp_max.toFixed(0)}°`,
        isP: true,
      },
      {
        icon: <UilArrowDown size={18} className="mr-1" />,
        title: "Low",
        value: `${temp_min.toFixed(0)}°`,
        isP: false,
      },
    ];
  }

  function countries(){
    return [
      {
        id: 1,
        title: 'Mumbai',
      },
      {
        id: 2,
        title: 'London',
      },
      {
        id: 3,
        title: 'Delhi',
      },
      {
        id: 4,
        title: 'Paris',
      },
      {
        id: 5,
        title: 'Tokyo',
      },
    ]
  }

  return {iconData, weatherInfoData, countries}
}

export default utils;