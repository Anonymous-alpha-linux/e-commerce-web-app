import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef, useReducer } from 'react';
import { mainAPI } from '../../config';


const AuthenticationContextAPI = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "authenticate":
            break;
        case "login":
            break;
        case "register":
            break;
        case "logout":
            break;
        case "forget":
            break;
        default:
            break;
    }
}

export default function AuthenticationContext({ children }) {
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken'),
    })

    // const [customer, dispatchCustomer] = useReducer((state, action) => {

    // }, { accessToken: localStorage.getItem('accessToken') });

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('user access token', user.accessToken);
        try {
            setLoading(true);
            axios.get(mainAPI.CLOUD_API_AUTH, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(response => {
                console.log('get response from', mainAPI.LOCALHOST_AUTH || mainAPI.CLOUD_API_AUTH);
                setResponse(response.data);
                setLoading(false);
            })
        }
        catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }, [user]);

    useEffect(() => {
        console.log('response', response)
    }, [response]);

    const login = React.useCallback(
        async (data) => {
            return axios.post(mainAPI.CLOUD_API_LOGIN,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }).then(response => {
                    console.log('response data', response.data)
                    localStorage.setItem('accessToken', response.data.accessToken);
                    setResponse(response.data);
                    setUser({
                        accessToken: localStorage.getItem('accessToken'),
                        isAuthenticated: response.data.isLoggedIn,
                        account: response.data.account,
                        role: response.data.role,
                    });

                });
        }
        , [response])

    const register = React.useCallback(async (data) => {
        return axios.post(mainAPI.CLOUD_API_REGISTER, { ...data })
            .then(response => {
                console.log('get response from', mainAPI.LOCALHOST_REGISTER || mainAPI.CLOUD_API_REGISTER, 'response data from register', response.data);
                localStorage.setItem('accessToken', response.data.accessToken);
                setResponse(response.data);
                setUser({
                    accessToken: response.data.accessToken,
                });
            })
    }, [response])

    const logout = React.useCallback(async () => {
        try {
            setLoading(true);
            return axios.get(mainAPI.CLOUD_API_LOGOUT)
                .then(res => {
                    console.log('get response from', mainAPI.LOCALHOST_LOGOUT || mainAPI.CLOUD_API_LOGOUT);
                    setLoading(false);
                    setResponse(res.data)
                    localStorage.removeItem('accessToken')
                })
        } catch (error) {
            setLoading(false);
        }
    }, [response])

    return (
        <AuthenticationContextAPI.Provider value={{
            loading,
            user,
            response,
            error,
            login,
            logout,
            register,
            setError,
            setUser,
            setResponse
        }}>
            {children}
        </AuthenticationContextAPI.Provider>
    )
}


export const useAuthorizationContext = () => {
    return useContext(AuthenticationContextAPI);
}