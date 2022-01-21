import React from 'react';

export default function Layout({ children, ...restProps }) {
    return <div {...restProps}>
        {children}
    </div>;
}
