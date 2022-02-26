import React, { useState, useEffect, useRef } from 'react'

export default function LazyLoading({ children }) {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef();
    useEffect(() => {
        document.addEventListener('scroll', (e) => {
            console.log(document.body, document.body.scrollHeight);
            // console.log(document.body., containerRef.current.scrollHeight);
            // const documentBodyHeight = (window.screen.height + window.scrollY) - document.body.scrollHeight;
            // console.log(documentBodyHeight);
        })
        return () => {
            document.addEventListener('scroll', (e) => {
                console.log('remove event scrolled window');
            })
        };
    }, []);

    // if (loading) return <h1>Loading...</h1>
    return (
        <div ref={containerRef}>
            {children}
        </div>
    )
}
