import React from "react";
import { useHistory } from "react-router-dom";
import "../Home.css";

// props -> cityName ,temp, color
function City({ cityName, weatherType, temp = 0, color }) {
  const history = useHistory();

  function handleClick() {
    history.push("/city?name=" + cityName);
  }

  return (
    <button
      className={
        "flex flex-row p-8 justify-between items-center cities " + color
      }
      onClick={handleClick}
    >
      <div className="flex flex-col cities">
        <div className="text-md font-thin text-left">{weatherType}</div>
        <div className="text-2xl font-bold">{cityName}</div>
      </div>

      <div className="text-5xl font-thin cities">{Math.round(temp)}°C</div>
    </button>
  );
}

export default City;
