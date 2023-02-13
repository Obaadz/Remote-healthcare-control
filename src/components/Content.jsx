import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

const LINK = "https://remote-healthcare-server.vercel.app/v2/devices/update";

const dump_data = [
  {
    heartRate: 99,
    temperature: 32.1,
    spo2: 93,
  },
];

const addRandomData = () => {
  const heartRate = Math.floor(Math.random() * (120 - 70 + 1) + 70);
  const temperature = Math.max(
    Math.floor(Math.random() * (40 - 30 + 1) + 30) + Math.random(),
    Math.floor(Math.random() * (40 - 30 + 1) + 30) + Math.random(),
    Math.floor(Math.random() * (40 - 30 + 1) + 30) + Math.random()
  );
  const spo2 = Math.floor(Math.random() * (100 - 90 + 1) + 90);

  dump_data.push({ heartRate, temperature, spo2 });
};

for (let i = 0; i < 100; i++) {
  addRandomData();
}

dump_data.sort((a, b) => {
  const avgA = (a.heartRate + a.temperature + a.spo2) / 3;
  const avgB = (b.heartRate + b.temperature + b.spo2) / 3;
  return avgA - avgB;
});

const splitData = (data, n) => {
  const splitIndex = Math.floor(data.length / n);
  const lowValues = data.slice(0, splitIndex);
  const highValues = data.slice(splitIndex * (n - 1), data.length);
  const middleValues = data.slice(splitIndex, splitIndex * (n - 1));
  return { lowValues, middleValues, highValues };
};

const splitDumpResult = splitData(dump_data, 3);

console.log(splitDumpResult["lowValues"]);

const Content = () => {
  const myRef = useRef();
  const myIntervalTime = useRef();
  const myValues = useRef();
  let selectedVal;

  useEffect(() => {
    myValues.current.addEventListener("click", (e) => {
      selectedVal = e.target.value;
    });
  });

  let Interval = () => {
    let whatIsList;
    let limit = 100;
    let i = 0;
    console.log(selectedVal);
    if (selectedVal && selectedVal !== "Sorted") {
      limit = 33;
      if (selectedVal === "lower") whatIsList = "lowValues";
      else if (selectedVal === "middle") whatIsList = "middleValues";
      else if (selectedVal === "higher") whatIsList = "highValues";
    }
    const selectedResult =
      selectedVal && selectedVal !== "Sorted" ? splitDumpResult[whatIsList] : dump_data;
    console.log(selectedResult);
    Interval = setInterval(() => {
      axios.put(LINK, {
        deviceId: "123456789011",
        dataToUpdate: selectedResult[i++],
      });

      if (i >= limit) clearInterval(Interval);
    }, Number(myIntervalTime.current.value));
  };
  return (
    <div className="items">
      <div className="it">
        <div className="item">
          <label htmlFor="deviceId">Device Id: </label>
          <input type="text" id="deviceId" ref={myRef} placeholder="deviceId" />
        </div>
        <div className="item">
          <label htmlFor="intervalTime">Repeat Request Time: </label>
          <input
            type="text"
            id="intervalTime"
            ref={myIntervalTime}
            placeholder="interval time"
          />
        </div>
      </div>

      <form ref={myValues}>
        <input type="radio" id="age1" name="how" value="lower" />
        <label htmlFor="age1">lower</label>
        <br />
        <input type="radio" id="age2" name="how" value="middle" />
        <label htmlFor="age2">middle</label>
        <br />
        <input type="radio" id="age3" name="how" value="higher" />
        <label htmlFor="age3">higher</label>
        <br />
        <input type="radio" id="age4" name="how" value="Sorted" />
        <label htmlFor="age4">Sorted</label>
      </form>
      <button
        onClick={() => {
          if (typeof Interval === "number") clearInterval(Interval);

          Interval = () => {
            let whatIsList;
            let limit = 100;
            let i = 0;
            console.log(selectedVal);
            if (selectedVal && selectedVal !== "Sorted") {
              limit = 33;
              if (selectedVal === "lower") whatIsList = "lowValues";
              else if (selectedVal === "middle") whatIsList = "middleValues";
              else if (selectedVal === "higher") whatIsList = "highValues";
            }
            const selectedResult =
              selectedVal && selectedVal !== "Sorted"
                ? splitDumpResult[whatIsList]
                : dump_data;
            console.log(selectedResult);
            Interval = setInterval(() => {
              axios.put(LINK, {
                deviceId: "123456789011",
                dataToUpdate: selectedResult[i++],
              });

              if (i >= limit) clearInterval(Interval);
            }, Number(myIntervalTime.current.value));
          };
          Interval();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          clearInterval(Interval);
        }}
      >
        Stop
      </button>
    </div>
  );
};

export default Content;
