import React, { useState, useEffect, useRef } from 'react'
import { Loader } from '.';
import { Text } from '../components';

export default function TriggerLoading({ children, ...restProps }) {
    /* restProps:
        1. loader: [Function]:
        + callback
        2. loadMore: [Boolean]
     */
    const [loading, setLoading] = useState(false);
    const loader = useRef(restProps.loader);

    useEffect(() => {
        loader.current = restProps.loader;
    }, [restProps.loader])

    return (
        <>
            {children}
            {restProps.loadMore === true &&
                <Text.Subtitle
                    style={{ textAlign: "center", width: "100%", margin: "10px 0" }}
                    onClick={async () => {
                        await setLoading(true);
                        await loader.current();
                        await setLoading(false);
                    }}>
                    More...
                </Text.Subtitle>
            }
            {loading && <Loader></Loader>}
        </>
    )
}
