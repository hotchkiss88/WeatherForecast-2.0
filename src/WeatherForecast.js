import React, { useEffect, useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastList from "./WeatherForecastList";

function WeatherForecast() {
  const [weatherList, setForecast] = useState([]);

  useEffect(() => {
    getWeatherData();
    const interval = setInterval(() => {
      getWeatherData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getWeatherData() {
    axios.get("https://danepubliczne.imgw.pl/api/data/synop").then((res) => {
      const weatherData = res.data;

      let newWeatherList = [];

      for (const weatherObject of weatherData) {
        let newWeatherObject = {
          city: weatherObject.stacja,
          temperature: weatherObject.temperatura,
          humidity: weatherObject.wilgotnosc_wzgledna,
          pressure: weatherObject.cisnienie,
          stationId: weatherObject.id_stacji,
        };
        console.log(weatherObject);

        newWeatherList.push(newWeatherObject);
      }
      return setForecast(newWeatherList);
    });
  }
  return (
    <div className="weatherWrapper">
      <WeatherForecastList weatherList={weatherList} />
    </div>
  );
}
export default WeatherForecast;
