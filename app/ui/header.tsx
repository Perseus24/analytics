"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = ({ username }: { username: string }) => {
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    }, []);

    const toggleDarkMode = () => {
        if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }
    };

    return (
        <div className='flex justify-between py-2 pt-4 text-black items-center dark:text-white'>
            {/* LINKS */}
            <div className="flex gap-4 items-center ">
                <a href="/  " className="hover:text-blue-800" >All</a>
                <a href="/dashboard" className="hover:text-blue-800">Stuffs</a>
                <a href="/analytics" className="hover:text-blue-800">Analytics</a>
            </div>
            {/* Profile */}
            <button onClick={toggleDarkMode}>🌓 Toggle Dark Mode</button>
            <button className="flex items-center rounded-full py-1 h-min border border-gray-300 text-sm pl-2 pr-3 gap-2 ">
                <div className="h-6 w-6 rounded-full bg-black dark:bg-white"></div>
                <span>
                    {
                        username ? (
                            <p>{username}</p>) : ( <>
                            <Link href="/signin" className="hover:text-blue-800">Login</Link> /  <Link href="/register" className="hover:text-blue-800">Register</Link></>
                        )
                    }
                </span>
            </button>
        </div>
    );
};

export default Header;