import React, { createContext, useContext, useState, useEffect } from 'react'


const UserContextAPI = createContext();

export default function UserContext({ children }) {
    const [state, setState] = useState({});
    return (
        <UserContextAPI.Provider value={{
            state
        }}>
            {children}
        </UserContextAPI.Provider>
    )
}


export const useUserContext = () => {
    return useContext(UserContextAPI);
}