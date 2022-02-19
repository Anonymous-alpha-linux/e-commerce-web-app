import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <a href={restProps.link} {...restProps}>{children}</a>;
}

ButtonComponent.Submit = function ({ children, ...restProp }) {
    return (
        <a className="button__submit" {...restProp}></a>
    )
}
ButtonComponent.Upload = function ({ children, ...restProp }) {
    return (
        <a className="button__upload" {...restProp}>
            {children}
        </a>
    )
}

