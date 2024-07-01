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
    <div>
      <span className="bg-orange-300 p-1 text-white rounded-md">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      :
      <span className="bg-orange-300 p-1 text-white rounded-md">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>
      :
      <span className="bg-orange-300 p-1 text-white rounded-md">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default CountdownTimer;
