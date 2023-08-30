"use client";

import { useEffect, useState } from "react";

export function useMenuState() {
    const [state, setState] = useState(false);

    useEffect(() => {
        const menuState = localStorage.getItem("menuState");
        menuState === "true" ? setState(true) : setState(false);
    }, []);
    
    return state;
}

export function useSetMenuState(menuState: boolean) {
    useEffect(() => {
        localStorage.setItem("menuIs", menuState + "");
    }, [menuState]);
}
