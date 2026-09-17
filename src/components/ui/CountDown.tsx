import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string | number | Date;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <div className="flex flex-col items-center">
        <span className="min-w-[32px] md:min-w-[36px] text-center font-mono font-bold text-xs md:text-sm bg-gray-900 text-white py-1 px-1.5 rounded-lg shadow-sm">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mt-0.5">
          Hrs
        </span>
      </div>
      <span className="font-bold text-gray-500 -mt-3">:</span>
      <div className="flex flex-col items-center">
        <span className="min-w-[32px] md:min-w-[36px] text-center font-mono font-bold text-xs md:text-sm bg-gray-900 text-white py-1 px-1.5 rounded-lg shadow-sm">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase mt-0.5">
          Mins
        </span>
      </div>
      <span className="font-bold text-gray-500 -mt-3">:</span>
      <div className="flex flex-col items-center">
        <span className="min-w-[32px] md:min-w-[36px] text-center font-mono font-bold text-xs md:text-sm bg-rose-600 text-white py-1 px-1.5 rounded-lg shadow-sm">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-semibold tracking-wider text-rose-500 uppercase mt-0.5">
          Secs
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
