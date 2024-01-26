import React, { useState, useEffect } from "react";
import { Badge } from "flowbite-react";
import { HiHome, HiCheck, HiClock } from "react-icons/hi";

const ReadingHeaderRightTimerSidebar = () => {
  const initialTime = 1200; // 20 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
    setIsPause(true);
  };

  // Function to restart the timer
  const restartTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  // Effect to handle timer logic
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Effect to handle page reload
  useEffect(() => {
    if (isRunning || isPause) {
      const handleBeforeUnload = (event) => {
        const message =
          "Are you sure you want to leave? Your timer progress will be lost.";
        event.returnValue = message;
        return message;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isRunning, isPause]);

  // Effect to store timer state in localStorage
  useEffect(() => {
    localStorage.setItem("timerState", JSON.stringify({ time, isRunning }));
  }, [time, isRunning]);

  // Effect to retrieve timer state from localStorage on mount
  useEffect(() => {
    const storedTimerState = localStorage.getItem("timerState");
    if (storedTimerState) {
      const { time: storedTime, isRunning: storedIsRunning } =
        JSON.parse(storedTimerState);
      setTime(storedTime);
      setIsRunning(storedIsRunning);
    }
  }, []);

  // Format time in HH:mm:ss
  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  return (
    <div className="sm:w-80 header-side">
      <div>
        <Badge size="sm" icon={HiClock} className="px-4 text-center">
          Duration：<span className="countdowntime">{formatTime(time)}</span>
        </Badge>
      </div>

      <div className="flex items-center w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mx-auto m-4 mb-1">
            <button
              data-tooltip-target="tooltip-pause-time"
              type="button"
              className="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
              onClick={pauseTimer}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="TRUE"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 10 16"
              >
                <path
                  fillRule="evenodd"
                  d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Pause Time</span>
            </button>

            <div
              id="tooltip-pause-time"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Pause Time
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button
              data-tooltip-target="tooltip-start-time"
              type="button"
              className="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
              onClick={startTimer}
            >
              <svg
                className="w-3 h-3 text-white dark:text-white"
                aria-hidden="TRUE"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 16"
              >
                <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
              </svg>
              <span className="sr-only">Start Time</span>
            </button>
            <div
              id="tooltip-start-time"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Start Time
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <button
              data-tooltip-target="tooltip-restart-time"
              type="button"
              className="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 me-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
              onClick={restartTimer}
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="TRUE"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                />
              </svg>
              <span className="sr-only">Restart</span>
            </button>
            <div
              id="tooltip-restart-time"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Restart
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              00:00
            </span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${(time / initialTime) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              20:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingHeaderRightTimerSidebar;
