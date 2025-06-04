"use client";
import React from 'react';

const DeveloperProfile: React.FC = () => {
    const dataNumber = [
        {
            title: "21",
            description: "YEARS OLD"
        },
        {
            title: "2",
            description: "YEARS OF EXPERIENCE"
        },
        {
            title: "1",
            description: "INTERNSHIP"
        },
        {
            title: "2",
            description: "CREDENTIALS"
        },
        {
            title: "+40",
            description: "STRESS DUE TO COURSE TAKEN"
        },
    ];
    return (
        <div className='w-full flex flex-col  bg-white'>
            <div className='w-full h-1 bg-[#00BFFF] shadow-lg'></div>
            <div className='mt-2 pr-2 w-full flex justify-end'>
                <a href="https://www.linkedin.com/in/cy-jay-herrera-74b297268/" target="_blank" rel="noopener noreferrer">
                    <svg className="cursor-pointer w-6 h-6 text-[#00BFFF] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                    </svg>
                </a>
                <a href="https://www.facebook.com/cyj.herrera.9?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                    <svg className="cursor-pointer w-6 h-6 text-[#00BFFF] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"/>
                    </svg>
                </a>
                <a href="https://github.com/Perseus24" target="_blank" rel="noopener noreferrer">
                    <svg className="cursor-pointer w-6 h-6 text-[#00BFFF] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/>
                    </svg>
                </a>
            </div>
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
            <div className="h-full w-full flex flex-col items-center">
                <div className='flex gap-10 w-full justify-center'>
                    <img className='w-96 h-96 rounded-full shadow-lg' src="/images/cy-profile.jpg" alt="Profile" />
                    <div className='flex flex-col text-black justify-center items-center w-2/5'>
                        <p className="text-sm mb-2">Just in case you forget who I am...</p>
                        <h1 className='text-4xl  font-extrabold'>Cy Jay Herrera</h1>
                        <p className='text-xl text-gray-600 font-semibold'>Currently Graduating ComSci</p>
                        <p className="text-md mt-10 indent-10 text-justify">I am a 4th year student at the Bicol University, studying BS in Computer Science. I am currently focused on web and system development
                            especially since our thesis revolved in that field.
                        </p>
                    </div>
                </div>
                <div className='mt-16 w-full flex flex-col items-center text-black'>
                    <div className='flex flex-wrap  justify-evenly w-3/5'>
                        {
                            dataNumber.map((item, index) => (
                                <div key={index} className='flex flex-col items-center m-3'>
                                    <h1 className='text-7xl font-extrabold text-[#00BFFF]'>{item.title}</h1>
                                    <p className='text-xl font-semibold'>{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='mt-20 mb-10 h-full w-full flex flex-col items-center'>
                <div className='border border-gray-100 flex flex-col'>
                    <img className='h-[600px] shadow-lg' src="/images/scholar-pic.jpg" alt="Scholar Batch 2025" />
                    <div className='bg-[#00BFFF] flex flex-col px-4 py-2'>
                        <p className='flex justify-between'>
                            <span>Scholar Batch 2025</span>
                            <span className='text-sm'>Bicol University - Main Campus</span>
                            </p>
                        <p className='text-sm'>28 May 2025</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-1 bg-[#00BFFF] shadow-lg'></div>
        </div>
    );
}

export default DeveloperProfile;
