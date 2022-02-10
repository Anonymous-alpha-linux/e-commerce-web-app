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
    // user {accessToken,isLoggedIn: true, role}
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken') || 'a.b.c'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        auth().then(() => {
            setLoading(true);
        }).finally(() => {
            setLoading(false);
        })
        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    const auth = async () => {
        const authApi = mainAPI.CLOUD_API_AUTH;
        // const authApi = mainAPI.LOCALHOST_AUTH;

        return axios.get(authApi, {
            cancelToken: cancelTokenSource.token,
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(response => {
            setUser({
                ...response.data
            })
        }).catch(error => {
            setError(error.message);
        })
    };

    const login = async (data, callback) => {
        // const loginApi = mainAPI.LOCALHOST_LOGIN;
        const loginApi = mainAPI.CLOUD_API_LOGIN;

        return axios.post(loginApi,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(res => {
                localStorage.setItem('accessToken', res.data.accessToken);
                setUser({
                    ...res.data
                });
            }).catch(error => setError(error.message));
    };

    const register = async (data, callback) => {
        const registerApi = mainAPI.CLOUD_API_REGISTER;
        // const registerApi = mainAPI.LOCALHOST_REGISTER;
        return axios.post(registerApi, { ...data })
            .then(res => {
                // console.log('get response from', mainAPI.LOCALHOST_REGISTER || mainAPI.CLOUD_API_REGISTER, 'response data from register', res.data);
                localStorage.setItem('accessToken', res.data.accessToken);
                setUser({ ...res.data });
            }).catch(error => setError(error.message));
    }

    const logout = React.useCallback(async () => {
        try {
            const lgoutApi = mainAPI.CLOUD_API_LOGOUT;
            // const lgoutApi = mainAPI.LOCALHOST_LOGOUT;

            return axios.get(lgoutApi)
                .then(res => {

                    localStorage.removeItem('accessToken');
                    setUser(res.data);
                })
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <Loading></Loading>

    return (
        <AuthenticationContextAPI.Provider value={{
            loading,
            user,
            error,
            login,
            logout,
            register,
            setError,
            setLoading,
            setUser,
        }}>
            {children}
        </AuthenticationContextAPI.Provider>
    )
}


export const useAuthorizationContext = () => {
    return useContext(AuthenticationContextAPI);
}
