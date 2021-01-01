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

  const [cities, setCities] = useState([
    {
      name: "Jakarta",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-300",
    },
    {
      name: "Seattle",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-200",
    },
    {
      name: "New York",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-100",
    },
    {
      name: "Seoul",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-300",
    },
    {
      name: "Tokyo",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-200",
    },
    {
      name: "Amsterdam",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-100",
    },
    {
      name: "Singapore",
      currentTemp: "0",
      weatherType: "",
      color: "bg-yellow-300",
    },
  ]);

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

  useEffect(() => {
    updateAllWeatherData();
  }, []);

  async function fetchWeatherData(cityName) {
    const res = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then(function (response) {
        // Successful request
        const weather = response.data;
        return weather;
      })
      .catch(function (error) {
        // The best practice of coding is to not use console.log
        console.warn(error);
      });

    return res;
  }

  async function updateAllWeatherData(params) {
    cities.forEach(function (citiesItems, index) {
      let weatherData = {};
      let newCities = [...cities];

      fetchWeatherData(citiesItems.name).then((res) => {
        weatherData = res;
        console.log(weatherData);

        newCities[index].currentTemp = weatherData.main.temp;
        newCities[index].weatherType = weatherData.weather[0].main;
        setCities(newCities);
      });
    });
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-6xl font-normal">peek</p>
        <p className="text-2xl font-thin text-gray-700">
          take a quick peek at the weather
        </p>
      </div>

      <div className="flex flex-col p-10">
        {cities.map((item, index) => (
          <City
            cityName={item.name}
            weatherType={item.weatherType}
            temp={item.currentTemp}
            color={item.color}
          />
        ))}

        {/* <City cityName={city} temp={currentTemp} color={"bg-yellow-300"} /> */}

        {/* <City cityName={city} temp={currentTemp} color={"bg-yellow-200"} /> */}

        {/* <City cityName={city} temp={currentTemp} color={"bg-yellow-100"} /> */}
      </div>
    </div>
  );
}

export default Home;
