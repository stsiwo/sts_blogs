import { useState, useEffect } from "react";

export const useResponsiveComponent = () => {

    const [currentScreenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleScreenWidth() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleScreenWidth);

        return () => {
            window.removeEventListener("resize", handleScreenWidth);
        };
    }, [currentScreenWidth]);

    return currentScreenWidth;
}
