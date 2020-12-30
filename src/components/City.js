import React from "react";

// props -> cityName, temp, color
function city({ cityName, temp, color }) {
  return (
    <div className={"flex flex-row justify-between p-8 items-center " + color}>
      <div className="text-2xl">{cityName}</div>
      <div className="text-5xl">{temp}</div>
    </div>
  );
}

export default city;
