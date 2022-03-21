import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { mainAPI } from "../../config";
import { Loading } from "../../pages";
const AdminContextAPI = createContext();

export default function AdminContext({ children }) {
  const options = {
    ASSIGN_MEMBERS_TO_WORKSPACE: 0,
    SET_CLOSURE_TIME: 1,
    SET_EVENT_TIME: 2,
    GET_ALL_WORKSPACE: 3,
    ASSIGN_ROLE_TO_ACCOUNT: 6,
  };
  const [state, setState] = useState({
    accounts: [],
    roles: [],
    errors: [],
    messages: [],
    loading: true,
  });
  const [adminAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
  useEffect(() => {
    getAccountList();
    getRoleList();
  }, []);
  function getAccountList(cb) {
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
        setState((o) => ({
          ...o,
          accounts: res.data.response,
        }));
      })
      .catch((error) => console.log(error.message));
  }
  function getRoleList(cb) {
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
        setState((o) => ({
          ...o,
          roles: res.data.response,
        }));
      })
      .catch((error) => console.log(error.message));
  }

  function assignMemberToWorkspace() {}
  function assignRoleToAccount() {}
  return (
    <AdminContextAPI.Provider
      value={{
        // accounts: accounts,
        // roles: roles,
        ...state,
      }}
    >
      {children}
    </AdminContextAPI.Provider>
  );
}

export const useAdminContext = () => {
  return useContext(AdminContextAPI);
};
