import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

import City from "../components/City";

function Home() {
  const history = useHistory();

  const [weatherData, setWeatherData] = useState(null);

  const [city, setCity] = useState("Jakarta");

  useEffect(() => {
    // console.log(process.env.REACT_APP_WEATHER_KEY);
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
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);

  const { currentTemp } = useMemo(() => {
    let currentTemp = "";
    if (weatherData) {
      currentTemp = `${Math.round(weatherData.main.temp)}°C`;
    }
    return { currentTemp };
  }, [weatherData]);

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex flex-col p-10">
        <City cityName={city} temp={currentTemp} color={"bg-yellow-300"} />

        {/* <City cityName={city} temp={currentTemp} color={"bg-yellow-200"} /> */}

        {/* <City cityName={city} temp={currentTemp} color={"bg-yellow-100"} /> */}
      </div>
    </div>
  );
}

export default Home;
