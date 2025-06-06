'use client';

const BackToTopBtn: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <button className='fixed bottom-10 right-10 text-white bg-[#00BFFF] rounded-full p-2 flex justify-center items-center z-50' onClick={() => scrollToTop()} title="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" className='text-white' xmlSpace="preserve" width="24" height="24" viewBox="0 0 32 32"><path d="M16 14 6 24l1.4 1.4 8.6-8.6 8.6 8.6L26 24zM4 8h24v2H4z"/><path d="M0 0h32v32H0z" style={{fill:"none"}}/></svg>
        </button>
    )
}

export default BackToTopBtn;
