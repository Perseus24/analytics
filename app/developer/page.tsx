"use client";
import React from 'react';

const DeveloperProfile: React.FC = () => {
    return (
        <div className='w-full flex flex-col  bg-white px-6 py-4'>
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-5xl text-black font-extrabold'>Cy Jay Herrera</h1>
                    <p className='text-xl text-gray-600 font-semibold'>Software Developer</p>
                </div>
                <div className='flex flex-wrap mt-10 text-black justify-evenly w-1/2 text-[13px]'>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 active-link-dev tracking-wide'>🧑‍💼 ABOUT ME</div>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 tracking-wide'>🌍 EXPERIENCES</div>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 tracking-wide'>📚 RESEARCHES</div>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 tracking-wide'>📖 MY LIFE (SO FAR)</div>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 tracking-wide'>🥇 AWARDS</div>
                    <div className='px-4 py-2 border border-[#00BFFF] m-2 tracking-wide'>💭 RANDOM THOTS</div>
                </div>
            </div>
            <div className="h-screen w-full flex flex-col items-center">
                <img className='w-96 h-96 rounded-full' src="/images/cy-profile.jpg" alt="Profile" />
            </div>
        </div>
    );
}

export default DeveloperProfile;
