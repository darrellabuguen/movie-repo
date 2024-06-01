import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";

const ButtonUp = () => {
    const [goToTop, showTop] = useState(false);

    useEffect(() => {
        function scrollHandle() {
            var scrolled = window.scrollY;
            if (scrolled > 300) {
                showTop(true);
            } else {
                showTop(false);
            }
        }
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle);
        }
    }, [])

    return (
        <>
            {goToTop && (
                <div className='fixed bottom-6 left-4 bg-gray-500 text-white h-9 w-9 rounded-full flex items-center justify-center shadow-md shadow-slate-900'>
                    <button
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <IoIosArrowUp />
                    </button>
                </div>
            )}
        </>
    )
}

export default ButtonUp