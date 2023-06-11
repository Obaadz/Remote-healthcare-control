import React, { useRef } from "react";
import axios from "axios";
import { LINK } from "./Content";

const GPS = ({ deviceId }) => {
  const latRef = useRef();
  const lngRef = useRef();

  async function updateGPS() {
    await axios.put(LINK, {
      deviceId,
      dataToUpdate: {
        lat: latRef.current.value,
        lng: lngRef.current.value,
      },
    });
  }

  return (
    <div className="gps">
      <hr />
      <form className="gps-form">
        <div>
          <label htmlFor="lat">latitude </label>
          <input type="text" id="lat" ref={latRef} placeholder="new latitude" />
        </div>
        <div>
          <label htmlFor="lng">longitude </label>
          <input type="text" id="lng" ref={lngRef} placeholder="new longitude" />
        </div>
      </form>
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          }

          function showPosition(position) {
            latRef.current.value = position.coords.latitude;
            lngRef.current.value = position.coords.longitude;
          }
        }}
      >
        get current lat and lng
      </button>
      <button onClick={updateGPS}>
        Update gps for deviceId: {deviceId ? deviceId : "empty id"}
      </button>
    </div>
  );
};

export default GPS;
