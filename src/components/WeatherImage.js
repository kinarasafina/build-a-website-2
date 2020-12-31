import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCloud,
  faCloudRain,
  faSun,
  faSmog,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

function WeatherImage({ weatherType }) {
  switch (weatherType) {
    case "clear sky":
      return <FontAwesomeIcon icon={faSun} size="6x" />;

    case "light rain":
      return <FontAwesomeIcon icon={faCloudRain} size="6x" />;

    case "overcast clouds":
      return <FontAwesomeIcon icon={faSmog} size="6x" />;

    case "few clouds":
      return <FontAwesomeIcon icon={faCloud} size="6x" />;

    case "broken clouds":
      return <FontAwesomeIcon icon={faCloud} size="6x" />;

    case "moderate rain":
      return <FontAwesomeIcon icon={faCloudRain} size="6x" />;

    default:
      return <FontAwesomeIcon icon={faWind} size="6x" />;
  }
}

export default WeatherImage;
