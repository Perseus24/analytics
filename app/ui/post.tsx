"use client";
import React, { useEffect, useState } from 'react';
import { Posts } from '../lib/definitions';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

type PostProps = {
    post: Posts;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const [user, setUser] = useState<User | null>(null);
    const [likes, setLikes] = useState(post.like_amount);
    const [postIsLiked, setPostIsLiked] = useState(false); 
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true, 
    });
    const [username, setUsername] = useState('Anonymous');

    useEffect(() => {
        likedPosts();
        getUser();
    })
    const likedPosts = async () => {
        const { data } = await supabase
            .from('user_likes')
            .select('*')
            .eq('user_id', user?.id)
            .eq('post_id', post.id)
            .single();
        if (data) {
            setPostIsLiked(true);
        }
    }
    const getUser = async () => {
        const { data:userData} = await supabase.auth.getUser();
        setUser(userData.user);
        // gets the username
        if (post.sender_id != null) {
            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', post.sender_id)
                .single();
            if (data) {
                setUsername(data.username);
            }
        }
    };
    const likedPost = async () => {
        // authenticated users are the only ones allowed to like posts
        if (user) {
            const newLikes = postIsLiked ? likes - 1 : likes + 1;
            const toggledLike = !postIsLiked;
            setPostIsLiked(toggledLike);
            setLikes(newLikes);

            // update like count
            const { error } = await supabase
                .from('posts')
                .update({ like_amount: newLikes })
                .eq('id', post.id);
            
            //check if already liked, then remove the entry
            if (!toggledLike) {
                const { error } = await supabase
                    .from('user_likes')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('post_id', post.id);
                if (error) {
                    console.error('Failed to remove like:', error.message);
                }
            } else {
                // insert new entry
                const {  } = await supabase
                    .from('user_likes')
                    .insert([{
                        user_id: user.id,
                        post_id: post.id
                    }]);
                
            }
            
            if (error) {
                console.error('Failed to update like count:', error.message);
            }
        }
    };
    return (
        <div className="flex flex-col gap-4 w-full h-min bg-white rounded-lg shadow-sm px-4 py-3 dark:text-white dark:bg-[#1A1A40]">
            <div className="flex w-full gap-5 text-xs font-medium items-center" >
                <p className="">{formattedDate}</p>
                <div className='rounded-full bg-black h-1 w-1 dark:bg-white'></div>
                <p className="">{username}</p>
            </div>
            <p>{post.post_text}</p>
            <div className="flex w-full">
                <div className="flex gap-2 items-center text-[13px] cursor-pointer" onClick={likedPost}>
                    <svg className="w-6 h-6 text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={postIsLiked ? 'blue' : 'black'} viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd"/>
                    </svg>
                    <p className="">{postIsLiked ? 'Liked' : 'Like'}</p>
                    <p className="">{likes}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;