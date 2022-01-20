import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function Router({ children, navigation, ...restProps }) {
    return (
        <BrowserRouter>
            {navigation}
            <Routes>
                {children}
            </Routes>
        </BrowserRouter>
    )
}

Router.Route = function ({ children, ...restProps }) {
    return <Route element={restProps.element} path={restProps.path}>
        {children}
    </Route>
}
