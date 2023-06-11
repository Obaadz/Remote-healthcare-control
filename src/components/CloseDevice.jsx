import React, { useRef } from "react";
import axios from "axios";
import { LINK } from "./Content";

const CloseDevice = ({ deviceId }) => {
  const heartRateRef = useRef();

  async function closeDeviceId() {
    await axios.put(LINK, {
      deviceId,
      dataToUpdate: {
        heartRateValid: 0,
        SPO2Valid: 0,
      },
    });
  }

  return (
    <div className="closeDevice">
      <hr />
      <button onClick={closeDeviceId}>
        click to close/offline deviceId: {deviceId ? deviceId : "empty id"}
      </button>
    </div>
  );
};

export default CloseDevice;
