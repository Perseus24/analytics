export interface Daylio {
    id: number,
    day: string, 
    emoticon: number,
    activities: string[],
}

export interface Moods {
    mood: number,
    total: number
}

export interface Posts {
    id: number,
    sender_id: number,
    created_at: string,
    post_text: string,
    like_amount: number,
    comments_amount: number
}