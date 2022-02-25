import React from 'react'

export default function List({ children, ...props }) {
    return (
        <ol {...props} className={`list ${props.className}`}>
            {children}
        </ol>
    )
}

List.Item = function ({ children, ...props }) {
    return <li className='list__item' {...props}>{children}</li>
}
