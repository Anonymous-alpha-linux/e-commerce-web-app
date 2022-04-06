import axios from "axios";
import React, { createContext, useContext, useState, useReducer } from "react";
import { mainAPI } from "../../config";
import { Loading } from "../../pages";
import { io } from "socket.io-client";
import actions from "../reducers/actions";
import { authReducer, initialAuth } from "../reducers";
import { toastTypes } from "../../fixtures";
import { useMessage } from "../../hooks";

const AuthenticationContextAPI = createContext();

export default function AuthenticationContext({ children }) {
  const [user, setUser] = useReducer(authReducer, initialAuth);
  // const [loading, setLoading] = useState(false);
  const [authAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_AUTH, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_AUTH, mainAPI.CLOUD_HOST];
  const staffAPI =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? mainAPI.LOCALHOST_STAFF
      : mainAPI.CLOUD_API_STAFF;

  const [toastList, pushToast, pullToast] = useMessage();
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  React.useEffect(() => {
    onLoadUser();
  }, []);
  const onLoadUser = (cb) => {
    return axios
      .get(authAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUser({
          type: actions.AUTHENTICATE_ACTION,
          payload: response.data,
        });
        let socket = io(host);
        socket.auth = { accessToken: localStorage.getItem("accessToken") };
        setSocket(socket);
        if (typeof cb !== "undefined") {
          cb(response.data.accountId);
        }
      })
      .catch((error) => {
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        });
        pushToast({
          message: "Sign-in to system",
          type: toastTypes.INFO,
        });
        if (typeof cb !== "undefined") {
          cb({});
        }
      });
  };
  function login(data, cb) {
    const loginApi =
      process.env.REACT_APP_ENVIRONMENT === "development"
        ? mainAPI.LOCALHOST_LOGIN
        : mainAPI.CLOUD_API_LOGIN;
    return axios
      .post(loginApi, data, {})
      .then(async (res) => {
        await localStorage.setItem("accessToken", res.data.accessToken);

        pushToast({
          message: "Login successfully",
          type: toastTypes.SUCCESS,
        });

        setUser({
          type: actions.LOGIN_ACTION,
          payload: res.data,
        });

        onLoadUser();

        cb();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setUser({
            type: actions.AUTHENTICATE_FAILED,
          });
          pushToast({
            message: error.response.data.error,
            type: toastTypes.ERROR,
          });
          cb();
        } else {
          pushToast({
            message: "Please login to system",
            type: toastTypes.INFO,
          });
          cb();
        }
      });
  }
  async function logout() {
    const logoutApi =
      process.env.REACT_APP_ENVIRONMENT === "development"
        ? mainAPI.LOCALHOST_LOGOUT
        : mainAPI.CLOUD_API_LOGOUT;
    return axios
      .get(logoutApi, {
        cancelToken: cancelTokenSource.token,
      })
      .then((res) => {
        localStorage.clear();
        setUser({
          type: actions.LOGOUT_ACTION,
        });
      })
      .catch((error) => {
        pushToast({
          message: error.message,
        });
      });
  }
  function getProfile(accountId, cb) {
    return axios
      .get(authAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "profile",
          accountid: accountId,
        },
      })
      .then((res) => {
        // setUser({
        //   type: actions.GET_PROFILE,
        //   payload: res.data.response,
        // });
        cb(res.data.response);
      })
      .catch((error) => {
        if (user.accountId === accountId) {
          pushToast({
            message: "You are not fulfill profile",
            type: toastTypes.WARNING,
          });
        }
        cb({ error: "Get profile failed" });
      });
  }
  function editProfile(input, cb) {
    return axios
      .put(authAPI, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "profile",
        },
      })
      .then((res) => {
        pushToast({
          message: "Edit Profile Successful",
          type: toastTypes.SUCCESS,
        });
        cb(res.data.response);
      })
      .catch((error) => {
        pushToast({
          message: "Edit Profile Failed",
          type: toastTypes.ERROR,
        });
        cb({ error: "get profile failed" });
      });
  }
  function editCurrentWorkspace(workspaceId, cb) {
    return axios
      .put(
        staffAPI,
        {
          workspaceid: workspaceId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "accountworkspace",
          },
        }
      )
      .then((res) => {
        onLoadUser(cb);
        pushToast({
          message: "Update Workspace successfully",
          type: toastTypes.SUCCESS,
        })
        cb();
      }).catch((err) => {
        pushToast({
          message: err.message,
          type: toastTypes.ERROR,
          timeout: 10000,
        });
      });;
  }
  function changeAvatar(file) {
    const formData = new FormData();
    formData.append(file);
  }
  function searchQuery() { }
  if (user.authLoading) return <Loading className="auth__loading"></Loading>;

  return (
    <AuthenticationContextAPI.Provider
      value={{
        loading: user.authLoading,
        user,
        profile: user.profile,
        socket,
        cancelTokenSource,
        toastList,
        pushToast,
        pullToast,
        onLoadUser,
        login,
        logout,
        editProfile,
        editCurrentWorkspace,
        getProfile,
      }}
    >
      {children}
    </AuthenticationContextAPI.Provider>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
};
