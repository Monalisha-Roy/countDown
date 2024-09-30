"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

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

const bgColor = [
  'bg-white',
  'bg-red-700',
  'bg-green-700',
  'bg-blue-800',
  'bg-yellow-600',
  'bg-pink-300',
  'bg-purple-600',
  'bg-indigo-500',
  'bg-teal-800',
  'bg-gray-500',
];

const borderColor = [
  'border-white',
  'border-red-700',
  'border-green-700',
  'border-blue-800',
  'border-yellow-600',
  'border-pink-300',
  'border-purple-600',
  'border-indigo-500',
  'border-teal-800',
  'border-gray-500',
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
          `,
        }}
      />

      <main className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="flex flex-col justify-center h-screen w-full">
          <div
            className="flex flex-col sm:flex-row items-center justify-center w-full"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <div className="text-center">
              <h1
                className={`text-2xl sm:text-2xl font-bold mb-6 font-orbitron ${textColor[currentColorIndex]}`}
              >
                Time Left in the Year
              </h1>
              <div
                className={`flex flex-col sm:flex-row gap-4 text-xl sm:text-2xl md:text-3xl ${textColor[currentColorIndex]}`}
              >
                <div className="w-full sm:w-52 text-center">
                  <p className="text-7xl sm:text-9xl font-bold font-orbitron">
                    {timeLeft.days.toString().padStart(2, '0')}{' '}
                    <span className="block text-lg sm:text-2xl">days</span>
                  </p>
                </div>
                <p className="text-5xl sm:text-9xl font-bold font-orbitron hidden sm:block">:</p>
                <div className="w-full sm:w-52 text-center">
                  <p className="text-7xl sm:text-9xl font-bold font-orbitron">
                    {timeLeft.hours.toString().padStart(2, '0')}{' '}
                    <span className="text-lg sm:text-2xl block">hours</span>
                  </p>
                </div>
                <p className="text-5xl sm:text-9xl font-bold font-orbitron hidden sm:block">:</p>
                <div className="w-full sm:w-52 text-center">
                  <p className="text-7xl sm:text-9xl font-bold font-orbitron">
                    {timeLeft.minutes.toString().padStart(2, '0')}{' '}
                    <span className="text-lg sm:text-2xl block">minutes</span>
                  </p>
                </div>
                <p className="text-5xl sm:text-9xl font-bold font-orbitron hidden sm:block">:</p>
                <div className="w-full sm:w-52 text-center">
                  <p className="text-7xl sm:text-9xl font-bold font-orbitron">
                    {timeLeft.seconds.toString().padStart(2, '0')}{' '}
                    <span className="text-lg sm:text-2xl block">seconds</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-4">
            <button
              className={`bg-transparent hover:${bgColor[currentColorIndex]} 
                ${textColor[currentColorIndex]} border-2 p-2 px-3 rounded-md font-orbitron ${borderColor[currentColorIndex]}`}
              onClick={handleColorChange}
            >
              Change Color
            </button>
          </div>
        </div>
      </main>

    </>
  );
};

export default CountdownTimer;
