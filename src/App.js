import './App.css';
import TopButton from './components/TopButton';
import Input from './components/Input';
import TimeandLocation from './components/TimeandLocation';
import TemperatureandDetails from './components/TemperatureandDetails';
import Forcast from './components/Forcast';
import {getWeather} from './weatherApiFunctions/weatherApi';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  async function fetchWeather(query, flag){
    try {
      const res = await getWeather(query, flag).then((res)=> res)
      return res;
    } catch (error) {
      toast.error(error.message);
    }
  }

  const [query, setQuery] = useState({q: 'delhi'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null)
  const isCoordRef = useRef(false);

  useEffect(()=>{
    async function getWeatherData(){

      let message = query.q ? query.q : 'current location.'
      toast.info(`Featching weather for ${message}`)

      if(isCoordRef.current){
        await fetchWeather({...query, units}, true).then((res)=>{
          setWeather(res);
          isCoordRef.current = true;
        })
      }else{
        await fetchWeather({...query, units}).then((res)=>{
          setWeather(res);
        })
      }
    }
    getWeatherData();
  },[query, units])


  const formatBackground = ()=>{
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className="App justify-center min-h-screen min-w-min">
      <div className= {`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}>
        <TopButton setQuery = {setQuery}/>
        <Input setQuery = {setQuery} units = {units} setUnits = {setUnits} isCoordRef = {isCoordRef}/>
        {
        weather && (
          <div>
            <TimeandLocation weather = {weather}/>
            <TemperatureandDetails weather = {weather}/>
            <Forcast title = {"hourly forecast"} items = {weather.currentHours} icon = {weather.icon}/>
            <Forcast title = {"daily forecast"} items = {weather.days} icon = {weather.icon}/>
          </div>
        )}
      </div>
      <ToastContainer autoClose = {3000} theme='colored' newestOnTop = {true}/>
    </div>
  );
}

export default App;
