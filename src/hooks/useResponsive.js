import { useState, useLayoutEffect, useRef } from "react";
import { media } from '../fixtures';

const initialValue = (min, max) =>
    (window.innerWidth >= max && media.PC) ||
    (window.innerWidth >= min && media.TABLET) ||
    media.MOBILE;

export default function useMedia(min = 768, max = 1023) {
    const [device, setDevice] = useState(() => initialValue(min, max));
    const matchMediaRef = useRef();

    useLayoutEffect(() => {
        matchMediaRef.current = window.matchMedia(
            `(min-width:${min}px) and (max-width:${max}px)`
        );
        const handleSetDevice = () => {
            setDevice(() => {
                if (matchMediaRef.current.matches) return `tablet`;
                else if (!matchMediaRef.current.matches && window.innerWidth <= min - 1)
                    return media.MOBILE;
                else if (!matchMediaRef.current.matches && window.innerWidth >= max + 1)
                    return media.PC;
            });
        };

        matchMediaRef.current.addEventListener("change", handleSetDevice);
        return () => {
            matchMediaRef.current.removeEventListener("change", handleSetDevice);
        };
    }, [min, max]);
    return device;
}
