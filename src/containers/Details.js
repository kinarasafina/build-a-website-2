import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import WeatherImage from "../components/WeatherImage";
import "../App.css";

// TODO
// - implement API
// - add props to details screen
// - style the details screen

function Details() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_KEY);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then(function (response) {
        // Successful request
        const weather = response.data;
        setWeatherData(weather);
      })
      .catch(function (error) {
        // The best practice of coding is to not use console.log
        console.log(error);
      });
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("name");
    if (city) {
      setCity(city);
    }
  }, [history]);

  const {
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${Math.round(weatherData.main.temp)}°C`;
      highTemp = `${Math.round(weatherData.main.temp_max)}°C`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${Math.round(weatherData.main.temp_min)}°C`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} mph`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  return (
    // Container
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="pt-8 pb-0 text-5xl font-bold text-yellow-400 flex">
        Weather in {city}
      </div>
      <div className="flex flex-row w-screen justify-center">
        <div className="flex flex-col p-8 m-4 border-2 rounded-md border-gray-700 items-center w-1/4">
          <WeatherImage weatherType={weatherType} className="text-xl" />
          <div className="mt-3 font-bold italic">{weatherType}</div>
          <div>
            <span className="font-bold">Current Temperature</span> :{" "}
            {currentTemp}
          </div>
        </div>

        <div className="flex flex-col p-8 m-4 border-2 rounded-md border-gray-700 items-center w-1/2 justify-center items-center">
          <div className="flex flex-row">
            <div className="ml-2 mr-8 mt-8 mb-8">
              <span className="font-bold">High Temperature</span> : {highTemp}
            </div>
            <div className="ml-2 mr-8 mt-8 mb-8">
              <span className="font-bold">Cloudiness</span> : {cloudiness}
            </div>
          </div>

          <div className="flex flex-row">
            <div className="ml-0 mr-8 mt-0 mb-8">
              <span className="font-bold">Low Temperature</span> : {lowTemp}
            </div>
            <div className="ml-0 mr-8 mt-0 mb-8">
              <span className="font-bold">Humidity</span> : {humidity}
            </div>
          </div>

          <div>
            <span className="font-bold">Wind Speed</span> : {windSpeed}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
