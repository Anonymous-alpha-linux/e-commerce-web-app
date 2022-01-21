import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef, useReducer } from 'react';
import { mainAPI } from '../config';
// import { dispatchAPI } from '../helpers';
// import { Auth } from '../helpers';


const AuthenticationContextAPI = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "user":
            break;
        case "staff":
            break;
        case "admin":
            break;
        default:
            break;
    }
}

export default function AuthenticationContext({ children }) {
    // const [user, setUser] = useReducer(AuthReducer, {
    //     accessToken: localStorage.getItem('accessToken')
    // });
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken'),
    })
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({});

    useEffect(() => {
        console.log('user access token', user.accessToken);
        try {
            setLoading(true);
            axios.get(mainAPI.LOCALHOST_AUTH, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(response => {
                console.log('get response from', mainAPI.LOCALHOST_AUTH);
                setResponse(response.data);
                setLoading(false);
            })
        }
        catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }, [user]);

    const login = (data) => {
        return axios.post(mainAPI.LOCALHOST_AUTH,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(response => {
                setUser(response.data);
            });
    }

    const register = () => {
        axios.post(mainAPI.LOCALHOST_REGISTER, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(response => {
            setUser(response.data);
        });
    }

    const logout = () => {
        try {
            setLoading(true);
            axios.get(mainAPI.LOCALHOST_LOGOUT)
                .then(res => {
                    console.log('get response from', mainAPI.LOCALHOST_LOGIN);
                    setLoading(false);
                    setResponse(res.data)
                    localStorage.removeItem('accessToken')
                })
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <AuthenticationContextAPI.Provider value={{
            loading,
            user,
            response,
            login,
            logout,
            register,
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