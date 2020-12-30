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
    <div className="h-screen bg-gray-900">
      <div className="flex flex-col p-10">
        <City cityName={"Jakarta"} temp={"29°C"} color={"bg-yellow-300"} />

        <City cityName={"Seattle"} temp={"5°C"} color={"bg-yellow-200"} />

        <City cityName={"New York"} temp={"-1°C"} color={"bg-yellow-100"} />
      </div>
    </div>
  );
}

export default Home;
