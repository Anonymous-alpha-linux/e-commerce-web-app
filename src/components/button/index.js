import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <button href={restProps.link} {...restProps}>{children}</button>;
}

<<<<<<< HEAD
ButtonComponent.Toggle = function ({ children, ...props }) {
    return <Button>{children}</Button>
}
=======
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

>>>>>>> 214104fe73bd7a877829f26cc93e5b1444beaee1
