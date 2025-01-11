"use client";
import React from 'react';

interface SidebarProps {
    className?: string; // Optional className prop
}

const Sidebar: React.FC<SidebarProps> = ({className}) => {
    return (
        <div className={`w-16 shadow-lg hover:w-32 transition-all ease-out duration-300 h-screen bg-white fixed top-0 left-0 ${className}`}></div>
    );
};

export default Sidebar;