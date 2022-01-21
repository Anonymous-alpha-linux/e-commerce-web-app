import React, { createContext, useContext, useState, useEffect } from 'react'


const AdminContextAPI = createContext();

export default function AdminContext({ children }) {
    const [state, setState] = useState({});
    return (
        <AdminContextAPI.Provider value={{
            state
        }}>
            {children}
        </AdminContextAPI.Provider>
    )
}


export const useAdminContext = () => {
    return useContext(AdminContextAPI);
}