import React from 'react';

export default function Textarea ({ children, ...restProps }) {
    return <Textarea {...restProps}>
        {children}
    </Textarea>
}

Textarea.Container = function ({ children, ...restProp }) {
    return (
        <div className="textarea__container" {...restProp}>
            {children}
        </div>
    )
}

Textarea.Input = function ({ children, ...restProp }) {
    return (
        <textarea className="textarea__input" {...restProp}>
            {children}
        </textarea>
    )
}