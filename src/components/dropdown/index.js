import React from 'react'

export default function DropDown({ children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

DropDown.Item = ({ children, ...props }) => {
    return <li {...props}>{children}</li>
}
