import React, { useRef } from "react";

const GPS = () => {
  const myRef = useRef();
  return (
    <div className="gps">
      <div ref={myRef}></div>
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            myRef.current.innerHTML = "Geolocation is not supported by this browser.";
          }

          function showPosition(position) {
            myRef.current.innerHTML =
              "Latitude: " +
              position.coords.latitude +
              "<br>Longitude: " +
              position.coords.longitude;
          }
        }}
      >
        click
      </button>
    </div>
  );
};

export default GPS;
