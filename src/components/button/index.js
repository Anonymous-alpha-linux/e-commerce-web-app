import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <Button href={restProps.link} {...restProps}>{children}</Button>;
}
