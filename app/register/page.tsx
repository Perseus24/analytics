"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if(data?.user){
            const {  error: userError} = await supabase
                .from('users')
                .insert([{
                    id: data?.user?.id,
                    email: email,
                    username: username,
                }]);

            if(!userError){
                window.location.href = '/signin';
            } else {
                setErrorMessage(userError.message);
            }
        }
        
        if(error){
            setErrorMessage(error.message);
        } 
    }
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#F4F4F8]'>
            <form onSubmit={registerUser} className='w-96 px-5 py-4 bg-white text-black flex flex-col gap-3 items-center dark:text-black dark:bg-white rounded-lg shadow-sm'>
                <p className='tracking-wide text-xl mb-3'>Register Form</p>
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
                <div className='w-full flex flex-col gap-2 items-start text-sm'>
                    <p>Preferred Username</p>
                    <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-2 py-1 rounded-lg w-full border border-gray-200 text-sm focus:outline-none" required placeholder='Enter your preferred username'/>
                </div>
                <div className='w-full flex gap-3 mt-3'>
                    <button type="submit" className='w-full bg-[#1A1A40] text-white text-sm py-2 rounded-lg hover:bg-[#1A1A40]/80'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;

