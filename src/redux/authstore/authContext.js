import { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from './reducer'

const AuthStore = createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AuthStore.Provider value={
        [state, dispatch]
    }>
        {children}
    </AuthStore.Provider>
}