// components/AudioPlayer.js
import React, { useState, useEffect, useRef } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Track mute state

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current.duration);
    });
    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current.currentTime);
    });
  }, [src]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restartAudio = () => {
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onScrub = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !audioRef.current.muted;
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-full">
        <div className="flex justify-center justify-between w-full py-2 px-8">
          {/* Volume/Mute button */}
          <button
            data-tooltip-target="tooltip-mute"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            onClick={toggleMute}
          >
            {isMuted ? (
              // Muted Icon
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Unmuted Icon
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.5 8.4a5 5 0 0 1 0 7.1m2.9 2.9a9 9 0 0 0 0-12.8m-6.4.5V18a1 1 0 0 1-1.6.7L6 15H4a1 1 0 0 1-1-1v-4c0-.6.4-1 1-1h2l4.4-3.6A1 1 0 0 1 12 6Z"
                />
              </svg>
            )}
            <span className="sr-only">Mute/Unmute</span>
          </button>
          <div
            id="tooltip-mute"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Mute/Unmute
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>

          {/* Play/Pause button */}
          <button
            className="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            onClick={togglePlayPause}
          >
            {/* Conditionally render play or pause icon */}
            {isPlaying ? (
              // Pause Icon
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 3.5a.75.75 0 0 0-1.5 0v13a.75.75 0 0 0 1.5 0v-13zM15.75 3.5a.75.75 0 0 0-1.5 0v13a.75.75 0 0 0 1.5 0v-13z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Play Icon
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 3.394a.75.75 0 0 1 1.13-.643l11 6.75a.75.75 0 0 1 0 1.286l-11 6.75A.75.75 0 0 1 4 17.25v-13.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Restart button */}
          <button
            data-tooltip-target="tooltip-restart"
            className="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            onClick={restartAudio}
          >
            <svg
              class="w-6 h-6 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
              />
            </svg>
            <span class="sr-only">Restart Audio</span>
          </button>
          <div
            id="tooltip-restart"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Restart Audio
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>

        {/* Audio track control (progress bar) */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <span className="start-time text-sm font-medium text-gray-500 dark:text-gray-400">
            {convertTime(currentTime)}
          </span>
          <input
            type="range"
            className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-800"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => onScrub(e.target.value)}
          />
          <span className="end-time text-sm font-medium text-gray-500 dark:text-gray-400">
            {convertTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
