// import React, { useState } from 'react'

// function Responsive({ children, ...props }) {
//     const [device, setDevice] = useState();
//     React.useEffect(() => {
//         window.addEventListener('resize', (e) => {
//             console.log(window.innerHeight);
//         })
//         return () => {
//             window.removeEventListener('resize');
//         };
//     }, []);
//     return (
//         <div className='responsive__hook'>
//             {children}
//         </div>
//     )
// }

// export default Responsive;


import { useState, useLayoutEffect, useRef } from "react";

const initialValue = (min, max) =>
    (window.innerWidth >= max && "pc") ||
    (window.innerWidth >= min && "tablet") ||
    "phone";

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
                    return `mobile`;
                else if (!matchMediaRef.current.matches && window.innerWidth >= max + 1)
                    return `pc`;
            });
        };

        matchMediaRef.current.addEventListener("change", handleSetDevice);
        return () => {
            matchMediaRef.current.removeEventListener("change", handleSetDevice);
        };
    }, [min, max]);
    return device;
}
