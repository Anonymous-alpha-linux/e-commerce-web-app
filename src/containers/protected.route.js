import React from 'react'
import { Route, Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, ...restProps }) {
    return (
        <Route {...restProps}>
            {children}
        </Route>
    )
}
