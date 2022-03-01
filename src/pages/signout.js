import React, { useRef, useEffect, useState } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/loading';
import { useAuthorizationContext } from '../redux';
import { mainAPI } from '../config';
import axios from 'axios';

export default function Signout() {
    const { logout, loading } = useAuthorizationContext();
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';

    useEffect(() => {
        logout();
    }, []);

    if (loading) {
        return <Loading>
        </Loading>;
    }

    return (
        <Navigate to={from} state={{ from: location }} replace></Navigate>
    )
}
