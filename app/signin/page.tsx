"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const signInUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const {error: signInError} = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if(!signInError){
            window.location.href = '/';
        } else {
            if(signInError.message == 'Invalid login credentials') setErrorMessage('Invalid email or password');
            if(signInError.message == 'User does not exist') setErrorMessage('User does not exist');
            if(signInError.message == 'Email not confirmed') setErrorMessage('Check your email for the confirmation email');
        }
    }
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#F4F4F8]'>
            <form onSubmit={signInUser} className='w-96 px-5 py-4 bg-white text-black flex flex-col gap-3 items-center dark:text-black dark:bg-white rounded-lg shadow-sm'>
                <p className='tracking-wide text-xl mb-3'>SignIn Form</p>
                <p className={`${errorMessage ? 'block' : 'hidden'} px-3 py-2 text-red-500 text-[13px] border border-red-500 rounded-lg`}>{errorMessage}</p>
                <div className='w-full flex flex-col gap-2 items-start text-sm'>
                    <p>Email</p>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 py-1 rounded-lg w-full border border-gray-200 text-sm focus:outline-none" required placeholder='Enter your email'/>
                </div>
                <div className='w-full flex flex-col gap-2 items-start text-sm'>
                    <p>Password</p>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-2 py-1 rounded-lg w-full border border-gray-200 text-sm focus:outline-none" required placeholder='Enter your password'/>
                </div>
                <div className='w-full flex gap-3 mt-3'>
                    <button type="submit" className='w-full bg-[#1A1A40] text-white text-sm py-2 rounded-lg hover:bg-[#1A1A40]/80'>Sign in</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

