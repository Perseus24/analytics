'use client';
import Header from "./ui/header";
import Post from "./ui/post";
import { useState, useEffect, useRef, ChangeEvent, useTransition } from 'react';
import { todayPosts } from "./lib/supabase";
import { Posts } from './lib/definitions';
import { supabase } from './lib/supabase';
import { User } from "@supabase/supabase-js";
import ThotsFooter from "./ui/thots-footer";
import { convertBlobUrlToFile } from "./lib/utils";
import { uploadImage } from "./lib/storage/client";
import ImagePickGallery from "./ui/image-pick-gallery";

export default function Home() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [post, setPost] = useState<Posts[]>([]);
  const [createPostText, setCreatePostText] = useState<string>("");
  const [loadingWidth, setLoadingWidth] = useState('0%');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const postsToday = async () => {
      startLoader();
      const data = await todayPosts();
      setPost(data);
      stopLoader();
    };
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
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
      console.log(data);
    };

    getUser();
    postsToday();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls(prev => {
        const updated = [...prev, ...newImageUrls];
        setCurrentIndex(updated.length - 1);  // update to last new image
        return updated;
      });
      
    }
  }
  const handleUploadImages = (id: number) => {
    startTransition(async () => {
      const urls = [];
      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const {imageUrl, error} = await uploadImage({
          file: imageFile,
          bucket: 'hobby',
          post_id: id
        }) 

        if (error) {
          console.error(error);
        } else {
          urls.push(imageUrl);
        }

        setImageUrls([]);
      }
    })

  }
  const startLoader = function(){
    setLoadingWidth('30%');
  }
  const stopLoader = function(){
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

    if(imageUrls.length > 0 && data){
      handleUploadImages(data[0].id);
    }

    stopLoader();
  };
  
  return (
    <div className="flex min-h-screen bg-[#F4F4F8] relative text-black dark:bg-black pb-20 flex-col">
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
                <Post key={index} post={post} />
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-[#1A1A40]" placeholder="What's on your mind?" 
              />
              {/* File input */}
              <input type="file" accept="image/*" disabled={isPending} ref={imageInputRef} multiple hidden onChange={handleImageChange}/>
              <button type="button" disabled={isPending} className="bg-[#1A1A40] text-white px-4 py-1.5 rounded-lg dark:bg-white dark:text-black" onClick={() => imageInputRef.current?.click()}>Select Images</button>
              <ImagePickGallery 
                imageUrls={imageUrls} 
                onImageChange={handleImageChange}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setImageUrls={setImageUrls}/>
              <div className="w-full flex justify-end">
                <button 
                  onClick={createPost} 
                  disabled={isPending}
                  className="px-4 py-1.5 bg-black text-white rounded-lg dark:bg-white dark:text-black">Post</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ThotsFooter />
    </div>
  );
}
