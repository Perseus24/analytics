"use client";
import React from 'react';

interface SidebarProps {
    className?: string; // Optional className prop
}

const Sidebar: React.FC<SidebarProps> = ({className}) => {
    return (
        <div className={`w-16 shadow-lg hover:w-32 transition-all ease-out duration-300 z-30 h-screen absolute left-0 ${className}`}></div>
    );
};

export default Sidebar;