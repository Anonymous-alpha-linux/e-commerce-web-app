import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <Button className='button__root' href={restProps.link} {...restProps}>{children}</Button>;
}

ButtonComponent.Upload = function ({ children, ...restProp }) {
    return (
        <a className="button__upload" {...restProp}>
            {children}
        </a>
    )
}
ButtonComponent.Summit = function ({ children, ...restProp }) {
    return (
        <a className="button__summit" {...restProp}>
            {children}
        </a>
    )
}
