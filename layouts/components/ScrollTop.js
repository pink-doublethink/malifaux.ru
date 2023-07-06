import React, { useCallback, useState, useEffect } from "react"

const ScrollTop=()=> {
    const [visible, setVisible] = useState(false);
    const [strict, setStrict] = useState(false);

    const handleResize = useCallback(() => {
        const screenSize = window.innerWidth;
        setVisible(screenSize > 980);
    }, []);
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const scrollToTop = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition - 80);
        setTimeout(scrollToTop, 15);
        }
    };

    const checkScroll = () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const threshold = windowHeight * 0.5;
        if (scrollPosition >= threshold) {setVisible(true); setStrict(true)}
        else setVisible(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, []);

    return (
        <button className="fixed bottom-3 right-3">
            {visible && strict ? 
                <button
                className="w-19 h-19 bg-blue-500 text-white text-4xl rounded-full flex justify-center items-center"
                onClick={scrollToTop}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 19V5" />
                    <path d="M5 12L12 5L19 12" />
                </svg>
                </button> : null
            }
        </button>
      );
}

export default ScrollTop