"use client";

interface Props {
    url: string,
    setClickedImageUrl: React.Dispatch<React.SetStateAction<string>>
}
const ZoomedImg: React.FC<Props> = ({url, setClickedImageUrl}) => {
    const downloadImage = async (url: string, filename = 'image.jpg') => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download failed', err);
        }
    };


    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-80">
            <img 
                src={url} 
                className="object-contain transform scale-90 origin-center max-w-[90%] max-h-[90%] rounded-lg shadow-lg"/>
            <button className="fixed top-20 left-20 text-white/75  bg-black rounded-full p-2 flex justify-center items-center hover:text-white "
                onClick={() => setClickedImageUrl('')}>
                <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
            </button>
            <div className="fixed flex top-20 right-20 gap-2">
                <button className="text-white/75 bg-black rounded-full p-2 flex justify-center items-center hover:text-white "
                    onClick={() => window.open(url, '_blank')} title="Open fullsize version">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg>
                </button>
                <button className="text-white/75 bg-black rounded-full p-2 flex justify-center items-center hover:text-white "
                    title="Download fullsize version" onClick={() => downloadImage(url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg>
                </button>
            </div>
            
        </div>
    )
};

export default ZoomedImg;