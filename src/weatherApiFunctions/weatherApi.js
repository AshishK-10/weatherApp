import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const BASE_URL_NEW = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const API_KEY_NEW = process.env.REACT_APP_API_KEY_NEW;

function fetchWeather(type, searchParams){
  return axios.get(BASE_URL+type, {
    params: {...searchParams, appid: API_KEY}
  }).then((res)=>res.data)
}

function fetchForcastData(searchParams, city){
  return axios.get(BASE_URL_NEW+city, {
    params: {...searchParams, key: API_KEY_NEW, contentType: "json"}
  }).then((res)=>res.data)
}

function formatedWeatherData(data){
 const {
   coord: {lat, lon},
   main: {temp, feels_like, temp_min, temp_max, humidity},
   name,
   dt,
   sys: {country, sunrise, sunset},
   weather,
   wind: {speed}
 } = data;

 const {main: details, icon} = weather[0]
 return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon,speed}
}

function formatForcastWeather(data){
  let {currentConditions: {datetime}, days, timezone} = data;

   let currentHours = days[0].hours.slice(19, 24).map((d)=>{
    return {
      daytime: getTime(d.datetime),
      temp: d.temp,
      icon: d.icon,
    }
   })

   days = days.slice(1,6).map((d)=>{
    return {
      daytime: getDay(d.datetime),
      temp: d.temp,
      icon: d.icon
    }
   })
  return {datetime, days, currentHours, timezone};
}

async function getWeather(searchParams, isLat = false){
  const weatherData = await fetchWeather('weather', searchParams).then(formatedWeatherData);
  var units = searchParams.units === 'metric' ? 'metric' : 'us';
  if(isLat){
    let {lat, lon} = weatherData;
    let str = lat + "," + lon;
    const forcastWeather = await fetchForcastData({unitGroup: units},str).then(formatForcastWeather)
    return {...weatherData, ...forcastWeather};
  }else{
    const forcastWeather = await fetchForcastData({unitGroup: units}, searchParams.q).then(formatForcastWeather)
    return {...weatherData, ...forcastWeather};
  }
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const getDay = (dateString)=>{
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[dayOfWeek];
}

const getTime = (time24)=>{
  const [hours, minutes, secs] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;
  const time12 = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
  return time12;
}

const getIcon = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`

export {getIcon, formatToLocalTime, getWeather}