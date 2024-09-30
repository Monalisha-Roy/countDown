"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const colors = [
  'white', 'red-700', 'green-700', 'blue-800', 'yellow-600', 
  'pink-300', 'purple-600', 'indigo-500', 'teal-800', 'gray-500'
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      const timeLeftMs = yearEnd.getTime() - now.getTime();
      if (timeLeftMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(timeLeftMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeftMs % (1000 * 60)) / 1000),
      };
    };

    const intervalId = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleColorChange = () => setCurrentColorIndex((currentColorIndex + 1) % colors.length);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');` }} />
      <main className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="flex justify-center h-screen w-full">
          <div className="flex items-center justify-center w-10/12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <div className="text-center">
              <h1 className={`text-2xl font-bold mb-6 font-orbitron text-${colors[currentColorIndex]}`}>
                Time Left in the Year
              </h1>
              <div className={`flex gap-4 text-2xl text-${colors[currentColorIndex]}`}>
                {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                  <React.Fragment key={unit}>
                    {idx > 0 && <p className="text-9xl font-bold font-orbitron">:</p>}
                    <div className="w-52">
                      <p className="text-9xl font-bold font-orbitron" style={{ minWidth: "110px" }}>
                        {timeLeft[unit as keyof typeof timeLeft].toString().padStart(2, "0")} <span className="block text-2xl">{unit}</span>
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-4">
            <button
              className={`bg-transparent hover:bg-${colors[currentColorIndex]} text-${colors[currentColorIndex]} border-2 p-2 px-3 rounded-md font-orbitron border-${colors[currentColorIndex]}`}
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
