import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

import City from "../components/City";

const weatherKey = `TODO`; // Your API Key here

function Home() {
  // TODO
  return (
    <div className="flex flex-col h-screen bg-green-200">
      <City cityName={"Jakarta"} temp={"29°C"} color={"bg-yellow-500"} />

      <City cityName={"Seattle"} temp={"5°C"} color={"bg-blue-500"} />

      <City cityName={"New York"} temp={"-1°C"} color={"bg-red-500"} />
    </div>
  );
}

export default Home;
