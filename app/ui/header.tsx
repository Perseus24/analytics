"use client";
import React from 'react';

const Header: React.FC = () => {
    return (
        <div className='flex justify-between px-10 py-2 text-black items-center'>
            {/* LINKS */}
            <div className="flex gap-4 items-center ">
                <a href="/dashboard" className="hover:text-blue-800" >Dashboard</a>
                <a href="/dashboard" className="hover:text-blue-800" >Stuffs</a>
                <a href="/analytics" className="hover:text-blue-800" >Analytics</a>
            </div>
            {/* Profile */}
            <button className="flex items-center rounded-full py-1 h-min border border-gray-300 text-sm pl-2 pr-3 gap-2 ">
                <div className="h-6 w-6 rounded-full bg-black"></div>
                Cy Jay Herrera
            </button>
        </div>
    );
};

export default Header;