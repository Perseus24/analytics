"use client";


const ThotsFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 w-full bottom-0 absolute dark:border-[#00BFFF] dark:bg-black">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">© 2025 Thots</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="/developer" className="mr-4 hover:underline md:mr-6">Developer's Profile</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default ThotsFooter;