// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from "@supabase/ssr"

// Replace with your Supabase project URL and public API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createSupabaseClient() {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
};

export const fetchDaylioData = async () => {
    const { data, error } = await supabase.from('daylio').select('*');
    if (error) {
        console.error('Error fetching posts:', error.message);
    }

    return data || [];
};

// function to get posts for today
export const todayPosts = async () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            post_images(*)
        `)
        .order('created_at', { ascending: false })
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay);
    if (error) {
        console.error('Error fetching posts:', error.message);
    }

    if(data){
        console.log(data[0]);
    }
    return data || [];
};


