import { useState, useEffect } from "react";

const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Attach resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return dimensions;
};

export default useWindowDimensions;
