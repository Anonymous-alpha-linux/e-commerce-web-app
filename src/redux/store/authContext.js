import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { mainAPI } from '../../config';
import { Loading } from '../../pages';
import { io } from 'socket.io-client';
import actions from '../reducers/actions';
import { unstable_batchedUpdates } from 'react-dom'

const AuthenticationContextAPI = createContext();
const initialAuth = {
  accessToken: localStorage.getItem('accessToken') || 'a.b.c',
  isLoggedIn: false,
  authLoading: true,
};
export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        authLoading: true
      };
    case actions.AUTHENTICATE_ACTION:
      return {
        ...state,
        ...action.payload,
        authLoading: false
      };
    case actions.AUTHENTICATE_FAILED:
      return {
        ...state,
        authLoading: false
      };
    case actions.LOGIN_ACTION:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        authLoading: false
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authLoading: false
      };
    case actions.FORGET_PASS_ACTION:
      return {
        ...state,
        ...action.payload
      };
    case actions.LOGOUT_ACTION:
      return {
        ...initialAuth,
        authLoading: false
      };
    default:
      return state;
  }
}
export default function AuthenticationContext({ children }) {
<<<<<<< HEAD
=======
  // const [user, setUser] = useState({
  //   accessToken: localStorage.getItem('accessToken') || 'a.b.c',
  //   isLoggedIn: false,
  // });
  // const [workspace, setWorkspace] = useState(null);
  const { REACT_APP_ENVIRONMENT } = process.env;
  console.log(REACT_APP_ENVIRONMENT);
  const [user, setUser] = useReducer(authReducer, initialAuth);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
>>>>>>> 9f63d46303af593b9897776c6ca03d5e4abf6143
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    try {
      onLoadUser();
    }
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    // .then(() => {
    //   setLoading(true);
    //   // const socketHost = mainAPI.CLOUD_HOST;
    //   const socketHost = mainAPI.LOCALHOST_HOST;
    //   const socket = io(socketHost, {
    //     auth: {
    //       accessToken: user.accessToken
    //     }
    //   }).on("join", (msg) => {
    //     console.log(msg);
    //     setSocket(socket);
    //   }).on("connect_error", err => {
    //     setError(err.message);
    //     socket.disconnect();
    //   });
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);
  useEffect(() => {
    console.log(user)
  }, [user]);
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("start", {
  //       user
  //     });

  //     socket.on("notify post", data => {
  //       console.log(data);
  //     })
  //   }
  // }, [socket]);
  const getSocket = () => {
    if (!socket) {
      throw new Error("Socket cannot be accessible!");
    }
    return socket;
  };
  const onLoadUser = () => {
    const authApi = REACT_APP_ENVIRONMENT !== 'development' ? mainAPI.CLOUD_API_AUTH : mainAPI.LOCALHOST_AUTH;
    return axios.get(authApi, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    }).then(response => {
      setUser({
        type: actions.AUTHENTICATE_ACTION,
        payload: response.data,
      });
    }).catch(error => {
      unstable_batchedUpdates(() => {
        setUser({
          type: actions.AUTHENTICATE_FAILED,
        });
        setError(error.message);
      });
    })
  };
  function login(data) {
    const loginApi = REACT_APP_ENVIRONMENT === 'development' ? mainAPI.LOCALHOST_LOGIN : mainAPI.CLOUD_API_LOGIN;
    return axios.post(loginApi,
      data,
      {
        cancelToken: cancelTokenSource.token,
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      }).then(res => {
        localStorage.setItem('accessToken', res.data.accessToken);
        return setUser({
          type: actions.LOGIN_ACTION,
          payload: res.data
        });
      }).then(end => {
        console.log('load again');
        return onLoadUser();
      }).catch(error => setUser({
        type: actions.AUTHENTICATE_FAILED,
      }));
  };
  // const register = async (data) => {
  //   const registerApi = mainAPI.CLOUD_API_REGISTER;
  //   // const registerApi = mainAPI.LOCALHOST_REGISTER;
  //   return axios.post(registerApi, { ...data }, {
  //     cancelToken: cancelTokenSource.token
  //   })
  //     .then(res => {
  //       // console.log('get response from', mainAPI.LOCALHOST_REGISTER || mainAPI.CLOUD_API_REGISTER, 'response data from register', res.data);
  //       localStorage.setItem('accessToken', res.data.accessToken);
  //       setUser({ ...res.data });
  //     }).catch(error => setUser({
  //       type: actions.ERROR_ACTION,
  //       error: error.message
  //     }));
  // };
  async function logout() {
    const logoutApi = REACT_APP_ENVIRONMENT === 'development' ? mainAPI.CLOUD_API_LOGOUT : mainAPI.LOCALHOST_LOGOUT;
    return axios
      .get(logoutApi, {
        cancelToken: cancelTokenSource.token
      })
      .then(res => {
        localStorage.clear();
        setUser({
          type: actions.LOGOUT_ACTION,
        });
      }).catch(error => setError(error.message));
  }
  return (
    <AuthenticationContextAPI.Provider value={{
      loading: user.authLoading,
      user,
      message,
      error,
      cancelTokenSource,
      getSocket,
      login,
      logout,
    }}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
}
