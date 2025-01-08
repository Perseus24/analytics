"use client";

import Header from "./ui/header";
import Sidebar from "./ui/sidebar";
import { useState, useEffect } from 'react';

export default function Home() {
  const createdDate = new Date("2025-01-08T11:11:00");

  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - createdDate.getTime();
      const totalSeconds = Math.floor(timeDifference / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;
      setTimeDifference({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  });
  
  return (
    <div className="flex h-screen w-screen bg-white text-black">
      <Sidebar className="z-30"/>
      <div className="pl-16 w-full flex flex-col gap-5 ">
        <Header />
        <main className="flex mx-10 gap-5">
          <div className="flex w-3/4">
            <div className="flex w-full gap-3">
              <div className="rounded-lg bg-white shadow-lg h-16 flex-1 flex flex-col gap-1 px-3 py-1">
                <p className="text-sm">Time since Creation</p>
                <p className="text-2xl font-bold">{timeDifference.days}d {timeDifference.hours}h {timeDifference.minutes}m {timeDifference.seconds}s</p>
              </div>
              <div className="rounded-lg bg-white shadow-lg  h-16 flex-1"></div>
              <div className="rounded-lg bg-white shadow-lg  h-16 flex-1"></div>
            </div>
          </div>
          <aside className="flex w-1/4 debug"></aside>
        </main>
      </div>
    </div>
  );
}
