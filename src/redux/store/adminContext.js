import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { mainAPI } from "../../config";
const AdminContextAPI = createContext();

export default function AdminContext({ children }) {
    const [accounts, setAccounts] = useState([]);
    const [roles, setRoles] = useState([]);
    const [state, setState] = useState({
        accounts: [],
        coordinators: [],
        roles: [],
        loading: true,
    })
    const [adminAPI, host] =
        process.env.REACT_APP_ENVIRONMENT === "development"
            ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
            : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
    useEffect(() => {
        getAccountList();
        getRoleList();
    }, []);
    function getAccountList() {
        return axios
            .get(adminAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                    view: "account",
                },
            })
            .then((res) => {
                console.log(res.data.response);
                setAccounts(res.data.response);
            })
            .catch((error) => console.log(error.message));
    }
    function getRoleList() {
        return axios
            .get(adminAPI, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                    view: "role",
                },
            })
            .then((res) => {
                console.log(res.data.response);
                setRoles(res.data.response);
            })
            .catch((error) => console.log(error.message));
    }
    return (
        <AdminContextAPI.Provider
            value={{
                accounts: accounts,
                roles: roles,
            }}
        >
            {children}
        </AdminContextAPI.Provider>
    );
}

export const useAdminContext = () => {
    return useContext(AdminContextAPI);
};
