import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [status, setStatus] = useState("Start");
  const [showMinute, setShowMinute] = useState(false);
  const [showHour, setShowHour] = useState(false);

  function handleClick() {
    setStatus((status.localeCompare("Start") === 0) ? "Stop" : "Start");
  }

  useEffect(() => {
    let intervalId = null;
    if(status.localeCompare("Stop") === 0) {
      intervalId = setInterval(() => {
        if(second === 59) {
          setSecond(-1);
          setShowMinute(true);
          if(minute !== 59) {
            setMinute(prevMinute => prevMinute + 1);
          }
          else {
            setMinute(0);
            setShowHour(true);
            setHour(prevHour => prevHour + 1);
          }
        }
        setSecond(prevSecond => prevSecond + 1);
      }, 1000);
    }
    else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [status, minute, second, hour]);

  function handleReset() {
    setSecond(0);
    setMinute(0);
    setHour(0);
    setShowHour(false);
    setShowMinute(false);
  }

  return (
    <div className="App">
      <h1><span style={showHour ? {} : {display: 'none'}}>{hour}h </span>
        <span style={showMinute ? {} : {display: 'none'}}>{minute}m </span>
        {second}s </h1>
      <button id="start" onClick={handleClick}>{status}</button>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
