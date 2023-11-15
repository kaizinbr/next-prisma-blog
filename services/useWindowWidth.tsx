"use client";
import { useState, useEffect } from "react";

function getCurrentDimension(innerWidth: any) {
    return {
        width: innerWidth
    };
}

export default function useWindowWidth(innerWidth: any) {
    const [windowWidth, setScreenSize] = useState(innerWidth);

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(innerWidth);
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [windowWidth]);

    return windowWidth;
}
