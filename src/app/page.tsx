"use client";
import React, { useEffect, useState } from "react";

const textColor = [
  'text-white',
  "text-red-700",
  "text-green-700",
  "text-blue-800",
  "text-yellow-600",
  "text-pink-300",
  "text-purple-600",
  "text-indigo-500",
  "text-teal-800",
  "text-gray-500",
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const timeLeftMs = yearEnd.getTime() - now.getTime();

      if (timeLeftMs <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeftMs % (1000 * 60)) / 1000),
      };
    };

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleColorChange = () => {
    setCurrentColorIndex((currentColorIndex + 1) % textColor.length);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-black text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap");

        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
      `}</style>
      <div className="flex justify-center h-screen w-full">
        <div className="flex items-center justify-center w-10/12">
          <div className="text-center">
            <h1
              className={`text-2xl font-bold mb-6 font-orbitron ${textColor[currentColorIndex]}`}
            >
              Time Left in the Year
            </h1>
            <div
              className={`flex gap-4 text-2xl ${textColor[currentColorIndex]}`}
            >
              <div className="w-52">
                <p
                  className="text-9xl font-bold font-orbitron"
                  style={{ minWidth: "110px" }}
                >
                  {timeLeft.days.toString().padStart(2, "0")}{" "}
                  <span className="block text-2xl">days</span>
                </p>
              </div>
              <p className="text-9xl font-bold font-orbitron">:</p>
              <div className="w-52">
                <p
                  className="text-9xl font-bold font-orbitron"
                  style={{ minWidth: "110px" }}
                >
                  {timeLeft.hours.toString().padStart(2, "0")}{" "}
                  <span className="text-2xl block">hours</span>
                </p>
              </div>
              <p className="text-9xl font-bold font-orbitron">:</p>
              <div className="w-52">
                <p
                  className="text-9xl font-bold font-orbitron"
                  style={{ minWidth: "110px" }}
                >
                  {timeLeft.minutes.toString().padStart(2, "0")}{" "}
                  <span className="text-2xl block">minutes</span>
                </p>
              </div>
              <p className="text-9xl font-bold font-orbitron">:</p>
              <div className="w-52">
                <p
                  className="text-9xl font-bold font-orbitron"
                  style={{ minWidth: "110px" }}
                >
                  {timeLeft.seconds.toString().padStart(2, "0")}{" "}
                  <span className="text-2xl block">seconds</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-4 ">
          <button
            className={`bg-transparent hover:bg-${textColor[currentColorIndex].replace("text-","")} 
              ${textColor[currentColorIndex]} border-2 p-2 px-3 rounded-md font-orbitron border-${textColor[currentColorIndex].replace("text-","")}
              `}
              onClick={handleColorChange}
          >
            Change Color
          </button>

        </div>
      </div>
    </main>
  );
};

export default CountdownTimer;
