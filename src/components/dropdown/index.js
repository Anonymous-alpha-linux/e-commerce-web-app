import React from 'react'

export default function DropDown({ children, forwardRef, ...props }) {
    return (
        <div className="dropdown"
            ref={forwardRef}
            value={props.value}
            style={props.style}
            {...props}>
            {children}
        </div>
    )
}
DropDown.DropBtn = ({ children, ...props }) => {
    return <span className="dropdown__dropbtn"
        {...props}>
        {children}
    </span>
}
DropDown.Content = ({ children, ...props }) => {
    return <div className="dropdown__content" {...props}>
        {children}
    </div>
}
DropDown.Item = ({ children, ...props }) => {
    return <span className='dropdown__item'
        {...props}>
        {children}
    </span>
}
DropDown.Option = ({ children, ...props }) => {
    return <span className='dropdown__option'
        onClick={(e) => props.setValue(e.target.value)}
        value={props.value}
        {...props}>
        {children}
    </span>
}