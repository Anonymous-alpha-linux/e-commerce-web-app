import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <Button href={restProps.link} {...restProps}>{children}</Button>;
}

ButtonComponent.Toggle = function ({ children, ...props }) {
    return <Button>{children}</Button>
}
