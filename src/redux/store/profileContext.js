import React, { createContext, useContext, useReducer } from 'react';

const ProfileContextAPI = createContext();
const profileReducer = (state, action) => {
    switch (action.type) {
        case 'personal':
            break;

        case 'manager':
            break;
        default:
            break;
    }
}

const initialprofilePage = {
    profile: {

    },
    profileLoading: true
}

export default function ProfileContext({ children }) {
    const [profilePage, dispatchprofilePage] = useReducer(profileReducer, initialprofilePage);

    return (
        <ProfileContextAPI.Provider value={{
            profilePage
        }}>
            {children}
        </ProfileContextAPI.Provider>
    )
}


export const useUserContext = () => {
    return useContext(ProfileContextAPI);
}