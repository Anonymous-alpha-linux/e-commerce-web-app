import React from 'react'

export default function DropDown({ children, ...props }) {
    const [value, setValue] = React.useState();
    const [openChildren, setOpenChildren] = React.useState(false);
    return (
        <div className="dropdown"
            onClick={() => setOpenChildren(!openChildren)}
            style={props.style}>
            <span
                className="dropdown__dropbtn">
                {props.component}
            </span>

            <input value={value} type="hidden" className="dropdown__input"></input>
            {openChildren && <div className="dropdown__content">
                {children}
            </div>}
        </div>
    )
}

DropDown.Item = ({ children, ...props }) => {
    return <span className='dropdown__item' {...props}>{children}</span>
}
