import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthorizationContext } from '../redux'

export default function ProtectedRoute({ children, authorized = ['admin', 'staff', 'QA_manager', 'QA_coordinator'], ...restProps }) {
    const { user } = useAuthorizationContext();
    const location = useLocation();

    if (!user.isLoggedIn) {
        return <Navigate to={'/login'} state={{ from: location }}></Navigate>
    }

    if (!authorized.includes(user.role)) {
        return <Navigate to={location.pathname} replace></Navigate>
    }
    return children
}
