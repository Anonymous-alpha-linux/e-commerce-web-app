import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
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
  const [authAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_AUTH, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_AUTH, mainAPI.CLOUD_HOST];
  const staffAPI = process.env.REACT_APP_ENVIRONMENT === "development" ? mainAPI.LOCALHOST_STAFF : mainAPI.CLOUD_API_STAFF;

  const [toastList, pushToast, pullToast] = useMessage()
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    onLoadUser();
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  const onLoadUser = (cb) => {
    setUser({
      type: actions.SET_LOADING
    })
    return axios
      .get(authAPI, {
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      })
      .then((response) => {
        if (response.status > 199 && response.status <= 299) {
          setUser({
            type: actions.AUTHENTICATE_ACTION,
            payload: response.data,
          });
          let socket = io(host);
          socket.auth = { accessToken: localStorage.getItem('accessToken') };
          setSocket(socket);
          pushToast({
            message: 'Get User successfully',
            type: toastTypes.SUCCESS
          });
          getProfile(response.data.accountId);
          cb(response.data.accountId);
        }
        else {
          throw new Error("Get data Failed!");
        }
      }).catch(error => {
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        });
        pushToast({
          message: "Login to system",
          type: toastTypes.INFO
        });
      })
  };
  function login(data) {
    const loginApi =
      process.env.REACT_APP_ENVIRONMENT === "development"
        ? mainAPI.LOCALHOST_LOGIN
        : mainAPI.CLOUD_API_LOGIN;
    return axios
      .post(loginApi, data, {
        cancelToken: cancelTokenSource.token,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        pushToast({
          messge: "Login successfully",
          type: toastTypes.SUCCESS
        })
        return onLoadUser();
      })
      .catch((error) => {
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        });
        pushToast({
          message: "Login to system",
          type: toastTypes.INFO
        });
      });
  }
  // const register = async (data) => {
  //   const registerApi = mainAPI.CLOUD_API_REGISTER;
  //   // const registerApi = mainAPI.LOCALHOST_REGISTER;
  //   return axios.post(registerApi, { ...data }, {
  //     cancelToken: cancelTokenSource.token
  //   })
  //     .then(res => {
  //       localStorage.setItem('accessToken', res.data.accessToken);
  //       setUser({ ...res.data });
  //     }).catch(error => setUser({
  //       type: actions.ERROR_ACTION,
  //       error: error.message
  //     }));
  // };
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
      })
  }
  function getProfile(accountId) {
    return axios
      .get(authAPI, {
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "profile",
          accountid: accountId,
        },
      })
      .then((res) => {
        setUser({
          type: actions.GET_PROFILE,
          payload: res.data.response,
        });
      })
      .catch((error) => {
        pushToast({
          message: "Get Profile Failed",
          type: toastTypes.ERROR
        });
      });
  }
  function editProfile(input) {
    return axios
      .put(
        authAPI,
        {
          ...input,
        },
        {
          cancelToken: cancelTokenSource.token,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "profile",
          },
        }
      )
      .then((res) => {
        pushToast({
          message:"Edit Profile Successful",
          type : toastTypes.SUCCESS
        })
        getProfile()})
      .catch((error) => {
        pushToast({
          message: "Edit Profile Failed",
          type: toastTypes.ERROR
        })
      });
  }
  function editCurrentWorkspace(workspaceId) {
    return axios.put(staffAPI, {
      workspaceid: workspaceId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "accountworkspace"
      }
    }).then(res => {
      onLoadUser();
      pushToast({
        message: "Update Workspace successfully",
        type: toastTypes.SUCCESS
      })
    }).catch(err => {
      pushToast({
        message: err.message,
        type: toastTypes.ERROR,
        timeout: 10000,
      });
    })
  }
  if (user.authLoading) return <Loading className="auth__loading"></Loading>;

  return (<>
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
        login,
        logout,
        editProfile,
        editCurrentWorkspace,
      }}
    >
      {children}
    </AuthenticationContextAPI.Provider>
  </>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
};
