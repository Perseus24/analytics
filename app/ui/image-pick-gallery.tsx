"use client";

import React, { useRef }  from "react";
interface Props {
    imageUrls: string[],
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
}

const ImagePickGallery: React.FC<Props> = ({imageUrls, onImageChange, currentIndex, setCurrentIndex, setImageUrls}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const next = () => {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
    };

    const prev = () => {
        setCurrentIndex(prev => (prev === 0 ? imageUrls.length - 1 : prev - 1));
    };

    const removeImage = (index: number) => {
        const updatedUrls = [...imageUrls];
        updatedUrls.splice(index, 1);
        setImageUrls(updatedUrls);
        setCurrentIndex(0);
    }
    return (
        <>
            {imageUrls.length !== 0 && (
                <div className="rounded-lg border border-gray-200 h-72 flex justify-center items-center group relative overflow-hidden">
                    <div
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {imageUrls.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-full object-cover flex-shrink-0"
                        />
                        ))}
                    </div>
                    <input type="file" accept="image/*" ref={imageInputRef} multiple hidden onChange={onImageChange}/>
                    <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 absolute top-2 left-2 z-30 bg-[#1A1A40] text-white flex items-center gap-3 rounded-full py-2 px-3 hover:bg-black cursor-pointer"
                        onClick={() => imageInputRef.current?.click()}>
                        <svg className="w-[20px] h-[20px] text-[#E2E2E2] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                        </svg>
                        Add
                    </div>
                    <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 absolute top-2 right-2 z-30 bg-[#1A1A40] text-white rounded-full p-2 hover:bg-black cursor-pointer"
                        onClick={() => removeImage(currentIndex)}>
                        <svg className="w-[20px] h-[20px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </div>
                    
                    {imageUrls.length !== 1 && (
                        <>
                            <button
                                disabled={currentIndex === 0}
                                onClick={prev}
                                className={`absolute left-2 top-[50%] translate-y-[-50%] z-30 rounded-full p-2 cursor-pointer ${
                                    currentIndex === 0
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : 'bg-[#1A1A40] text-white hover:bg-black'
                                }`}
                                >
                                <svg fill="currentColor" height="16" icon-name="left-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m12.793 19.707-9-9a1 1 0 0 1 0-1.414l9-9 1.414 1.414L5.914 10l8.293 8.293-1.414 1.414Z"></path></svg>
                            </button>

                            <button
                                onClick={next}
                                className={`absolute right-2 top-[50%] translate-y-[-50%] z-30 rounded-full p-2 cursor-pointer ${
                                    currentIndex === imageUrls.length - 1
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : 'bg-[#1A1A40] text-white hover:bg-black'
                                }`}
                                disabled={currentIndex === imageUrls.length - 1}
                                >
                                <svg fill="currentColor" height="16" icon-name="right-fill" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m7.207 19.707-1.414-1.414L14.086 10 5.793 1.707 7.207.293l9 9a1 1 0 0 1 0 1.414l-9 9Z"></path></svg>
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ImagePickGallery;
