import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { mainAPI } from '../../config';
import { Loading } from '../../pages';


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
    // const [user, dispatchUser] = useReducer(AuthReducer, {
    //     accessToken: localStorage.getItem('accessToken') || ''
    // });
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken') || ''
    });
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({});
    const [error, setError] = useState('');
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        setLoading(true);
        auth(response => {
            console.log('from authentication', response);
            setUser(oldUser => {
                return {
                    ...oldUser,
                    ...response.data,
                }
            });
        }).finally(() => {
            setLoading(false);
        })

        return () => {
            cancelTokenSource.cancel();
        };

    }, []);

    const auth = React.useCallback(async (callback) => {
        return axios.get(mainAPI.CLOUD_API_AUTH, {
            cancelToken: cancelTokenSource.token,
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(
            response => {
                callback(response);
            },
        ).catch(error => {
            setError(error.message);
        })
    }, [user]);

    const login = async (data, callback) => {
        const loginApi = mainAPI.LOCALHOST_LOGIN;
        // const login_api = mainAPI.CLOUD_API_LOGIN;

        return axios.post(loginApi,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                callback(res);
            }).catch(error => setError(error.message));
    };

    const register = async (data, callback) => {
        return axios.post(mainAPI.CLOUD_API_REGISTER, { ...data })
            .then(response => {
                console.log('get response from', mainAPI.LOCALHOST_REGISTER || mainAPI.CLOUD_API_REGISTER, 'response data from register', response.data);
                callback(response);
            }).catch(error => setError(error.message));
    }

    const logout = React.useCallback(async () => {
        try {
            return axios.get(mainAPI.CLOUD_API_LOGOUT)
                .then(res => {
                    setLoading(false);
                    localStorage.removeItem('accessToken');
                    setUser(res.data);
                })
        } catch (error) {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <Loading></Loading>

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
            setLoading,
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