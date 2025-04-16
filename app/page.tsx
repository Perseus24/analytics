"use client";
import Header from "./ui/header";
import Post from "./ui/post";
import { useState, useEffect } from 'react';
import { todayPosts } from "./lib/supabase";
import { Posts } from './lib/definitions';
import { supabase } from './lib/supabase';
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [post, setPost] = useState<Posts[]>([]);
  const [createPostText, setCreatePostText] = useState<string>("");
  const [loadingWidth, setLoadingWidth] = useState('0%');

  useEffect(() => {
    const postsToday = async () => {
      setLoadingWidth('30%');
      const data = await todayPosts();
      setPost(data);
      stopLoader();
    };
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        const { data:userData } = await supabase 
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();
        if(userData){
            setUsername(userData.username);
        }
      }
    };

    getUser();
    postsToday();
  }, []);

  const startLoader:any = function(){
    setLoadingWidth('30%');
  }
  const stopLoader: any = function(){
    setLoadingWidth('100%');
    // Reset after delay
    setTimeout(() => {
        setLoadingWidth('0%');
    }, 600);
  }

  const createPost = async () => {
    setLoadingWidth('30%');
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          post_text: createPostText,
          like_amount: 0,
          sender_id: (user) ? user.id : null,
          comments_amount: 0
        }
      ])
      .select();

    if (error) {
      console.error('Error creating post:', error.message);
    } else {
      setPost((prevPosts) => [data[0], ...prevPosts]);
      setCreatePostText('');
    }
    stopLoader();
  };
  
  return (
    <div className="flex min-h-screen bg-[#F4F4F8] text-black dark:bg-black pb-5">
      <div id="loading-indicator" style={{
            width: loadingWidth,
            transition: 'width 0.3s ease-in-out'
          }} 
          className="w-full h-2 bg-green-500 absolute top-0"></div>
      <div className="px-10 w-full flex flex-col gap-5 ">
        <Header username={username}/>
        <div className="flex gap-10">
          <main className="flex flex-col gap-5 w-3/5">
            {
              post.map((post, index) => (
                <Post key={index} post={post} startLoader={startLoader} stopLoader={stopLoader}/>
              ))
            }
          </main>
          <aside className="flex flex-col w-2/5 h-min">
            <div className="flex flex-col gap-4 w-full bg-white rounded-lg shadow-sm px-4 py-3 text-[13px] dark:bg-[#1A1A40] dark:text-white">
              <p className="">{username? `@${username}` : 'Anonymous'}</p>
              <textarea 
                rows={6}
                value={createPostText} 
                onChange={(e) => setCreatePostText(e.target.value)} 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-[#1A1A40]" placeholder="What's on your mind?" />
              <div className="w-full flex justify-end">
                <button 
                  onClick={createPost} 
                  className="px-4 py-1.5 bg-black text-white rounded-lg dark:bg-white dark:text-black">Post</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
