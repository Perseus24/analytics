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
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
    console.log(`${startOfDay} - ${endOfDay}`);
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay);

    if (error) {
        console.error('Error fetching posts:', error.message);
    }
    return data || [];
};


