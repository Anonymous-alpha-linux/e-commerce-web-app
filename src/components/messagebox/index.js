import React from 'react';

export default function MessageBox({ children, ...restProps }) {
    return (
        <div className='messagebox__root' {...restProps}>
            {children}
        </div>
    )
}

MessageBox.TextMessage = function({ children, ...props }) {
    return (
        <p className="messagebox__textMessage" {...props}>{children}</p>
    )
}