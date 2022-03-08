import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { mainAPI } from "../../config";
import { Loading } from "../../pages";
import { io } from "socket.io-client";
import actions from "../reducers/actions";
import { authReducer, initialAuth } from "../reducers";

const AuthenticationContextAPI = createContext();

export default function AuthenticationContext({ children }) {
  const [user, setUser] = useReducer(authReducer, initialAuth);
  const [authAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_AUTH, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_AUTH, mainAPI.CLOUD_HOST];

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    try {
      onLoadUser(() => {
        getProfile();
      });
    } catch (error) {
      setError(error.message);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);
  const onLoadUser = (cb) => {
    return axios
      .get(authAPI, {
        cancelToken: cancelTokenSource.token,
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
        socket.auth = { accessToken: response.data.accessToken };

        return setSocket(socket);
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        });
        setError(error.message);
      });
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
        return onLoadUser();
      })
      .catch((error) =>
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        })
      );
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
      .catch((error) => setError(error.message));
  }
  function getProfile() {
    return axios
      .get(authAPI, {
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "profile",
          accountid: user.accountId,
        },
      })
      .then((res) => {
        return setUser({
          type: actions.GET_PROFILE,
          payload: res.data.response,
        });
      })
      .catch((error) => setError(error.message));
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
      .then((res) => getProfile())
      .catch((error) => {
        setError(error.message);
      });
  }

  if (user.authLoading) return <Loading className="auth__loading"></Loading>;

  return (
    <AuthenticationContextAPI.Provider
      value={{
        loading: user.authLoading,
        user,
        profile: user.profile,
        message,
        error,
        socket,
        cancelTokenSource,
        login,
        logout,
        editProfile,
        setError,
        setMessage,
      }}
    >
      {children}
    </AuthenticationContextAPI.Provider>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
};
