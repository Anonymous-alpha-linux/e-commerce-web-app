import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '.';
import { usePostContext } from '../redux';

export default function LazyLoading({ children, ...restProps }) {
    const [loading, setLoading] = useState(false);
    const [element, setElement] = useState(null);
    const {
        posts,
        myPosts
    } = usePostContext();
    const loader = useRef(restProps.loader);
    let intersectionObserver = useRef(new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setLoading(true);
                loader.current(() => {
                    setLoading(false);
                })
            }
        })
    }, {
        root: document,
        rootMargin: '0px',
        threshold: 1,
    }));

    // const scrollHandler = (e) => {
    //     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    //     const scrolled = window.scrollY;
    //     console.log('scroll again');
    //     if (loading) {
    //         loadNextPosts(() => {
    //             setLoading(false);
    //         });
    //         return;
    //     }
    //     else if (Math.floor(scrolled) === scrollable) {
    //         console.log('reach to bottom');
    //         setLoading(true);
    //         return scrollHandler(e);
    //     }
    // }

    useEffect(() => {
        loader.current = restProps.loader;
    }, [restProps.loader])

    useEffect(() => {
        const childrens = children.ref.current?.childNodes;
        const lastChildren = childrens?.item(childrens.length - 1);
        setElement(lastChildren);
    }, [children.ref.current,
        posts,
        myPosts
    ]);

    useEffect(() => {
        if (element) {
            intersectionObserver.current.observe(element)
        }
        return () => {
            if (element) {
                intersectionObserver.current.unobserve(element);
            }
        }
    }, [element]);

    return (
        <>
            {children}
            {loading && <Loader></Loader>}
        </>
    )
}
