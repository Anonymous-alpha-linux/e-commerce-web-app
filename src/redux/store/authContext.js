import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { mainAPI } from '../../config';
import { Loading } from '../../pages';
import { io } from 'socket.io-client';
import actions from '../reducers/actions';
import { useLocation, useNavigate } from 'react-router-dom';

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
        authLoading: action.authLoading
      };
    case actions.AUTHENTICATE_ACTION:
      return {
        ...state,
        ...action.payload
      };
    case actions.AUTHENTICATE_FAILED:
      return {
        ...state
      };
    case actions.LOGIN_ACTION:
      localStorage.setItem('accessToken', action.payload.accessToken);
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      };
    case actions.FORGET_PASS_ACTION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
export default function AuthenticationContext({ children }) {
  // const [user, setUser] = useState({
  //   accessToken: localStorage.getItem('accessToken') || 'a.b.c',
  //   isLoggedIn: false,
  // });
  // const [workspace, setWorkspace] = useState(null);
  const { NODE_ENV } = process.env;
  const [user, setUser] = useReducer(authReducer, initialAuth);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    try {
      onLoadUser();
    }
    catch (error) {
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

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("start", {
  //       user
  //     });

  //     socket.on("notify post", data => {
  //       console.log(data);
  //     })
  //   }
  //   setUser({
  //     type: actions.SET_LOADING,
  //     authLoading: true
  //   });
  // }, [socket]);

  const getSocket = () => {
    if (!socket) {
      throw new Error("Socket cannot be accessible!");
    }
    return socket;
  }
  const onLoadUser = async () => {
    console.log(NODE_ENV);
    const authApi = NODE_ENV === 'development' ? mainAPI.CLOUD_API_AUTH : mainAPI.LOCALHOST_AUTH;

    return axios.get(authApi, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    }).then(response => {
      console.log(response);
      setUser({
        type: actions.LOGIN_ACTION,
        payload: response.data
      });

    }).catch(error => {
      setError(error.message);
    }).finally(() => {
      setUser({
        type: actions.SET_LOADING,
        authLoading: false
      })
    })
  };
  function login(data) {
    // const loginApi = mainAPI.LOCALHOST_LOGIN;
    const loginApi = mainAPI.CLOUD_API_LOGIN;

    return axios.post(loginApi,
      data,
      {
        cancelToken: cancelTokenSource.token,
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      }).then(res => {
        // setUser({
        //   ...res.data
        // });

        setUser({
          type: actions.LOGIN_ACTION,
          payload: res.data
        });
      }).catch(error => (error.message));
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
  // }

  return (
    <AuthenticationContextAPI.Provider value={{
      loading: user.authLoading,
      user,
      message,
      error,
      cancelTokenSource,
      getSocket,
      login
    }}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
}

export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
}
