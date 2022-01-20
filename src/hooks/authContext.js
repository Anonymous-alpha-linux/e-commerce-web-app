import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { mainAPI } from '../config';
import { dispatchAPI } from '../helpers';
// import { Auth } from '../helpers';


const AuthenticationContextAPI = createContext();

export default function AuthenticationContext({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(mainAPI.CLOUD_API_CUSTOMER, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then(response => {
            setUser(response.data);
        });
    }, []);

    return (
        <AuthenticationContextAPI.Provider value={{
            user,
            setUser
        }}>
            {children}
        </AuthenticationContextAPI.Provider>
    )
}


export const useAuthorizationContext = () => {
    return useContext(AuthenticationContextAPI);
}