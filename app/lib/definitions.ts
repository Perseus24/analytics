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