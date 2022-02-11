import React from 'react';
import { Button } from './styles/button';

export default function ButtonComponent({ children, ...restProps }) {
    return <button href={restProps.link} {...restProps}>{children}</button>;
}

