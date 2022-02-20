import React, { useRef, useEffect, useState } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/loading';
import { useAuthorizationContext } from '../redux';
import { mainAPI } from '../config';
import axios from 'axios';

export default function Signout() {
    const { setUser, setError, cancelTokenSource } = useAuthorizationContext();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || '/';

    useEffect(() => {
        logout();
    }, []);

    async function logout() {
        try {
            const logoutApi = mainAPI.CLOUD_API_LOGOUT;
            // const lgoutApi = mainAPI.LOCALHOST_LOGOUT;
            return axios.get(logoutApi, {
                cancelToken: cancelTokenSource.token
            })
                .then(res => {
                    console.log('logout');
                    // localStorage.removeItem('accessToken');
                    localStorage.clear()
                    navigate(from, {
                        replace: true
                    })
                    setUser({
                        accessToken: 'a.b.c',
                        ...res.data
                    });
                })
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading>
        </Loading>;
    }

    return (
        <Navigate to={from} state={{ from: location }} replace></Navigate>
    )
}
