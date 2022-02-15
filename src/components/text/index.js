import React from 'react'

export default function Text({ children, ...props }) {
    return (
        <p className='text' {...props}>
            {children}
        </p>
    )
}
Text.Title = function ({ children, ...props }) {
    return <h2 className="text__title" {...props}>
        {children}
    </h2>
}
Text.Subtitle = function ({ children, ...props }) {
    return <h3 className='text__subtitle' {...props}>{children}</h3>
}
Text.Date = function ({ children, ...props }) {
    return <p className="text__date" {...props}>{children}</p>
}
Text.Paragraph = function ({ children, ...props }) {
    return <p className='text__paragraph' {...props}>{children}</p>
}
Text.Label = function ({ children, ...props }) {
    return <label {...props} htmlFor={props.htmlFor}>{children}</label>
}
Text.Line = ({ children, ...props }) => {
    return <div className='text__line' {...props}>{children}</div>
}
Text.MiddleLine = ({ children, ...props }) => <span className='text__middleLine' {...props}>{children}</span>
Text.RightLine = ({ children, ...props }) => <span className='text__rightLine' {...props}>{children}</span>
Text.CenterLine = ({ children, ...props }) => <span className='text__centerLine' {...props}>{children}</span>
Text.Group = ({ children, ...props }) => <span className='text__group' {...props}>{children}</span>
Text.Middle = ({ children, ...props }) => {
    return <p className='text__middle' {...props}>{children}</p>
}
Text.Center = ({ children, ...props }) => <p className='text__center' {...props}>{children}</p>;
Text.Bold = ({ children, ...props }) => <p className='text__bold' {...props}>{children}</p>
Text.Camel = ({ children, ...props }) => <p className='text__camel' {...props}>{children}</p>