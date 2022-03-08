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
import { unstable_batchedUpdates } from "react-dom";
import actions from "../reducers/actions";
import { authReducer, initialAuth } from "../reducers";

const AuthenticationContextAPI = createContext();

export default function AuthenticationContext({ children }) {
  const { REACT_APP_ENVIRONMENT } = process.env;
  const [user, setUser] = useReducer(authReducer, initialAuth);
  const [postAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  const authApi =
    REACT_APP_ENVIRONMENT !== "development"
      ? mainAPI.CLOUD_API_AUTH
      : mainAPI.LOCALHOST_AUTH;

  useEffect(() => {
    try {
      onLoadUser(() => {
        getProfile();
        getNotifications();
      });
    } catch (error) {
      setError(error.message);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("session", (data) => {
        console.log(data);
      });

      // socket.on("notify", data => {
      //   console.log(data);
      // });

      pushNotification();
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const getSocket = () => {
    if (!socket) {
      throw new Error("Socket cannot be accessible!");
    }
    return socket;
  };
  const onLoadUser = (cb) => {
    return axios
      .get(authApi, {
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
        unstable_batchedUpdates(() => {
          setUser({
            type: actions.AUTHENTICATE_FAILED,
          });
          setError(error.message);
        });
      });
  };
  function login(data) {
    const loginApi =
      REACT_APP_ENVIRONMENT === "development"
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
      REACT_APP_ENVIRONMENT === "development"
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
      .get(authApi, {
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
        authApi,
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
  function pushNotification() {
    return socket.on("notify", (data) => {
      setUser({
        type: actions.PUSH_NOTIFICATION,
        payload: data,
      });
    });
  }
  function getNotifications() {
    return axios
      .get(authApi, {
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "notification",
          page: 0,
          count: 10,
        },
      })
      .then((res) =>
        setUser({
          type: actions.GET_NOTIFICATIONS,
          payload: res.data.response,
        })
      )
      .catch((error) => {
        setError(error.message);
      });
  }
  function loadMoreNotification() {
    return axios
      .get(authApi, {
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "notification",
          page: user.page + 1,
          count: 10,
        },
      })
      .then((res) =>
        setUser({
          type: actions.GET_NOTIFICATIONS,
          payload: res.data.response,
        })
      )
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
        getSocket,
        login,
        logout,
        editProfile,
        loadMoreNotification,
        setMessage,
        setError,
      }}
    >
      {children}
    </AuthenticationContextAPI.Provider>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
};
