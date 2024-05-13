import { useEffect, useState } from 'react'

const useLayout = () => {
    const [contPage, setPage] = useState("");

    const setPageNum = (width) => {
        let page;
        if (width < 1300) {
            page = "1";
        } else {
            page = "4";
        }
        setPage(page);
    };

    const checkScreen = () => {
        const { innerWidth } = window;
        setPageNum(innerWidth);
    };

    useEffect(() => {
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    });

    return { contPage };
}

export default useLayout