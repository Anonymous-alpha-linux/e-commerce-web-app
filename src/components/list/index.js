import React from 'react'

export default function List({ children, ...props }) {
    return (
        <ul {...props} className={`list ${props.className}`}>
            {children}
        </ul>
    )
}

List.Item = function ({ children, ...props }) {
    return <li className='list__item' {...props}>{children}</li>
}
