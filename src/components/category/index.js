import React from 'react';

export default function Category({ children, ...restProps }) {
    return (
        <div className='category__root' {...restProps}>
            {children}
        </div>
    )
}

Category.Container = function({ children, ...props }) {
    return (
        <div className="category__container" {...props}>{children}</div>
    )
}

Category.TagContainer = function({ children, ...props }) {
    return (
        <div className="category__tagcontainer" {...props}>{children}</div>
    )
}