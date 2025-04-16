"use client";
import React from 'react';

const Header: React.FC = () => {
    return (
        <div className='flex justify-between py-2 pt-4 text-black items-center'>
            {/* LINKS */}
            <div className="flex gap-4 items-center ">
                <a href="/  " className="hover:text-blue-800" >All</a>
                <a href="/dashboard" className="hover:text-blue-800">Stuffs</a>
                <a href="/analytics" className="hover:text-blue-800">Analytics</a>
            </div>
            {/* Profile */}
            <button className="flex items-center rounded-full py-1 h-min border border-gray-300 text-sm pl-2 pr-3 gap-2 ">
                <div className="h-6 w-6 rounded-full bg-black"></div>
                <span>
                    <a className="hover:text-blue-800">Login</a> /  <a className="hover:text-blue-800">Register</a>
                </span>
            </button>
        </div>
    );
};

export default Header;