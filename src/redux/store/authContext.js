import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mainAPI } from '../../config';
import { Loading } from '../../pages';
import { io } from 'socket.io-client';

const AuthenticationContextAPI = createContext();

export default function AuthenticationContext({ children }) {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken') || 'a.b.c',
  });
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const cancelTokenSource = axios.CancelToken.source();
  useEffect(() => {
    auth().then(() => {
      setLoading(true);
      // const socketHost = mainAPI.CLOUD_HOST;
      const socketHost = mainAPI.LOCALHOST_HOST;
      const socket = io(socketHost, {
        auth: {
          accessToken: user.accessToken
        }
      }).on("join", (msg) => {
        console.log(msg);
        setSocket(socket);
      }).on("connect_error", err => {
        console.log(err.message);
        socket.disconnect();
      });
    }).finally(() => {
      setLoading(false);
    });
    console.log(user);
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  const auth = async () => {
    const authApi = mainAPI.CLOUD_API_AUTH;
    // const authApi = mainAPI.LOCALHOST_AUTH;

    return axios.get(authApi, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    }).then(response => {
      setUser({
        ...response.data
      })
    }).catch(error => {
      setError(error.message);
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
        localStorage.setItem('accessToken', res.data.accessToken);
        setUser({
          ...res.data
        });
      }).catch(error => setError(error.message));
  };
  const register = async (data) => {
    const registerApi = mainAPI.CLOUD_API_REGISTER;
    // const registerApi = mainAPI.LOCALHOST_REGISTER;
    return axios.post(registerApi, { ...data }, {
      cancelToken: cancelTokenSource.token
    })
      .then(res => {
        // console.log('get response from', mainAPI.LOCALHOST_REGISTER || mainAPI.CLOUD_API_REGISTER, 'response data from register', res.data);
        localStorage.setItem('accessToken', res.data.accessToken);
        setUser({ ...res.data });
      }).catch(error => setError(error.message));
  }


  if (loading) return <Loading></Loading>

  return (
    <AuthenticationContextAPI.Provider value={{
      loading,
      user,
      socket,
      cancelTokenSource,
      workspace,
      message,
      error,
      setWorkspace,
      setSocket,
      login,
      register,
      setError,
      setMessage,
      setLoading,
      setUser,
    }}>
      {children}
    </AuthenticationContextAPI.Provider>
  )
}
export const useAuthorizationContext = () => {
  return useContext(AuthenticationContextAPI);
}
