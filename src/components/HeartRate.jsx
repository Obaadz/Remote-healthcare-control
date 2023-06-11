import React, { useRef } from "react";
import axios from "axios";
import { LINK } from "./Content";

const HeartRate = ({ deviceId }) => {
  const heartRateRef = useRef();

  async function updateHeartRate() {
    await axios.put(LINK, {
      deviceId,
      dataToUpdate: {
        heartRate: Number(heartRateRef.current.value),
        heartRateValid: 1,
        SPO2Valid: 1,
      },
    });
  }

  return (
    <div className="heartRate">
      <hr />
      <form className="heartrate-form">
        <div>
          <label htmlFor="heartRate">HeartRate </label>
          <input
            type="text"
            id="heartRate"
            defaultValue={135}
            ref={heartRateRef}
            placeholder="new HeartRate"
          />
        </div>
      </form>

      <button onClick={updateHeartRate}>
        Update Heartrate for deviceId: {deviceId ? deviceId : "empty id"}
      </button>
    </div>
  );
};

export default HeartRate;
