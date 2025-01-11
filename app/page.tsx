"use client";

import Header from "./ui/header";
import Sidebar from "./ui/sidebar";
import { useState, useEffect } from 'react';
import PieChart  from "./ui/pieChart";
import { fetchDaylioData } from "./lib/supabase";
import { Daylio} from './lib/definitions';

export default function Home() {

  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [divsCount, setDivsCount] = useState(0);
  const [daylioEmo, setDaylioEmo] = useState<Daylio[]>([]);
  const currentTime = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const createdDate = new Date("2025-01-08T11:11:00");

    const countDivCount = async () => {
      try {
        const response = await fetch("/api/googleSearch");
        const data = await response.json();
        setDivsCount(data.divCount);
      } catch (e) {
        console.log(e);
      }
    };

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

    const fetchDaylio = async () => {
      const data = await fetchDaylioData();
      setDaylioEmo(data);
    }

    countDivCount();
    fetchDaylio();
    return () => clearInterval(interval);
  }, []);

  const moodCount = [0,0,0,0,0];
  daylioEmo.forEach((item)=>{
    moodCount[item.emoticon-1]++;
  })

  const dayliopieData = {
    labels: ['awful', 'bad', 'meh', 'good', 'rad'],
    values: moodCount
  };

  return (
    <div className="flex h-screen w-screen bg-white text-black relative">
      <Sidebar className="z-10"/>
      <div className="pl-16 w-full flex flex-col gap-5 ">
        <Header />
        <main className="flex mx-10 gap-5">
          <div className="flex flex-col w-3/4 gap-5">
            {/* data numbers  */}
            <div className="flex w-full gap-3">
              <div className="rounded-lg bg-white shadow-lg h-16 flex-1 flex flex-col gap-1 px-3 py-2">
                <p className="text-sm">Time since Creation</p>
                <p className="text-2xl font-bold">{timeDifference.days}d {timeDifference.hours}h {timeDifference.minutes}m {timeDifference.seconds}s</p>
              </div>
              <div className="rounded-lg bg-white shadow-lg h-16 flex-1 flex flex-col gap-1 px-3 py-2">
                <p className="text-sm">Divs Count</p>
                <p className="text-2xl font-bold">{divsCount}</p>
              </div>
              <div className="rounded-lg bg-white shadow-lg h-16 flex-1 flex flex-col gap-1 px-3 py-2">
                <p className="text-sm">Word Count</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
            {/* content */}
            <div className="flex flex-col w-full bg-white rounded-lg shadow-lg px-3 py-3 gap-3">
              <p>Today is the {currentTime.getDate()}th day of {monthNames[currentTime.getMonth()]}, {currentTime.getFullYear()}</p>
              <p>Currently, nothing is happening.</p>
            </div>
          </div>
          <aside className="flex flex-col gap-3 w-1/4 bg-white rounded-lg shadow-lg p-3">
            <div className="flex w-full justify-between">
              <p className="poppins-300">Emo</p>
              <p className="text-gray-300">{currentTime.getDate()}/365</p>
            </div>
            <PieChart data={dayliopieData} />
          </aside>
        </main>
      </div>
    </div>
  );
}
