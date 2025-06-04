// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and public API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchDaylioData = async () => {
    const { data, error } = await supabase.from('daylio').select('*');
    if (error) {
        console.error('Error fetching posts:', error.message);
    }

    return data || [];
};

export const todayPosts = async () => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching posts:', error.message);
    }
    return data || [];
};


