"use client";

import Header from "./ui/header";
import Post from "./ui/post";
import { useState, useEffect } from 'react';
import { todayPosts } from "./lib/supabase";
import { Posts } from './lib/definitions';
import { supabase } from './lib/supabase';

export default function Home() {
  const [post, setPost] = useState<Posts[]>([]);
  const [createPostText, setCreatePostText] = useState<string>("");
  useEffect(() => {
    const postsToday = async () => {
      const data = await todayPosts();
      setPost(data);
    };
    postsToday();
  }, []);

  const createPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          post_text: createPostText,
        }
      ])
      .select();

    if (error) {
      console.error('Error creating post:', error.message);
    } else {
      setPost((prevPosts) => [data[0], ...prevPosts]);
      setCreatePostText('');
    }
  };
  
  return (
    <div className="flex h-screen w-screen bg-[#F4F4F8] text-black relative">
      <div className="px-10 w-full flex flex-col gap-5 ">
        <Header />
        <div className="flex gap-10">
          <main className="flex flex-col gap-5 w-3/5">
            {
              post.map((post, index) => (
                <Post key={index} post={post}/>
              ))
            }
          </main>
          <aside className="flex flex-col w-2/5 h-min">
            <div className="flex flex-col gap-4 w-full bg-white rounded-lg shadow-sm px-4 py-3 text-[13px]">
              <p className="">Anonymous</p>
              <textarea 
                rows={6}
                value={createPostText} 
                onChange={(e) => setCreatePostText(e.target.value)} 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" placeholder="What's on your mind?" />
              <div className="w-full flex justify-end">
                <button 
                  onClick={createPost} 
                  className="px-4 py-1.5 bg-black text-white rounded-lg">Post</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
