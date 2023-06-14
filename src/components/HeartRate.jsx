import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LINK } from "./Content";
import Pusher from "pusher-js";

const OPTIONS_LINK = "https://remote-healthcare-server.vercel.app/v2/options";

Pusher.logToConsole = true;
const pusher = new Pusher("17e704d4e34a2978834b", {
  cluster: "eu",
});

const channel = pusher.subscribe("handling");

const HeartRate = ({ deviceId }) => {
  const heartRateRef = useRef();
  const [isEnableHandling, setIsEnableHandling] = useState(false);

  useEffect(async () => {
    try {
      const {
        data: { enableHandling },
      } = await axios.get(OPTIONS_LINK);

      setIsEnableHandling(enableHandling);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  channel.bind("handling-changed", function ({ enableHandling }) {
    setIsEnableHandling(enableHandling);
  });

  async function updateHeartRate() {
    await axios.put(LINK, {
      deviceId,
      heartRateForceChange: true,
      newHeartRate: Number(heartRateRef.current.value) || 100,
      dataToUpdate: {
        heartRate: Number(heartRateRef.current.value) || 100,
        heartRateValid: 1,
        SPO2Valid: 1,
      },
    });
  }

  async function switchHandling() {
    axios.put(OPTIONS_LINK, {
      enableHandling: !isEnableHandling,
    });
  }

  return (
    <div className="heartRate">
      <hr />
      <h3>Handling Status: {isEnableHandling ? "Enabled" : "Disabled"}</h3>
      <button onClick={switchHandling}>Switch handling status</button>
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
      <br />
      <button onClick={updateHeartRate}>
        Update Heartrate for deviceId: {deviceId ? deviceId : "empty id"}
      </button>
    </div>
  );
};

export default HeartRate;
