import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { mainAPI } from '../../config';
import { notifyData, socketTargets } from '../../fixtures'
import actions from '../reducers/actions';
import { notifyReducer, initialNotify } from '../reducers';
import { useAuthorizationContext } from './authContext';

const NotificationContextAPI = createContext();

export default function NotificationContext({ children }) {
    const [notify, setNotify] = useReducer(notifyReducer, initialNotify);
    const { user, socket, setError } = useAuthorizationContext();
    const [notifyAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_AUTH, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_AUTH, mainAPI.CLOUD_HOST];
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        if (socket) {
            createSession();
            // pushNotification();
            receiveNotification();
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
            cancelTokenSource.cancel();
        };
    }, [socket]);
    useEffect(() => {
        loadNotifications();
    }, []);
    function loadNotifications() {
        return axios.get(notifyAPI, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'notification',
                page: notify.page,
                count: notify.count
            }
        }).then(res => setNotify({
            type: actions.GET_NOTIFICATIONS,
            payload: res.data.response
        }))
            .catch(e => {
                console.log(e.message);
                setError(e.message);
            });
    }
    function loadMoreNotifications() {
        return axios.get(notifyAPI, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'notification',
                page: notify.page + 1,
                count: notify.count
            }
        }).then(res => {
            setNotify({
                type: actions.PUSH_NOTIFICATION,
                payload: res.data.response
            })
        }).catch(error => setError(error.messge));
    }
    function createSession() {
        return socket.on('session', data => {
            console.log(data);
        });
    }
    function receiveNotification() {
        return socket.on('notify', data => {
            console.log(data);
        });
    }
    function sendNotification(type, url, target) {
        return socket.emit("notify", {
            id: user.accountId,
            url: url,
            type: type,
            to: target
        });
    }
    // function pushNotification() {
    //     return socket.on("notify", data => {
    //         setUser({
    //             type: actions.PUSH_NOTIFICATION,
    //             payload: data
    //         })
    //     });
    // }
    // function getNotifications() {
    //     return axios.get(authApi, {
    //         cancelToken: cancelTokenSource.token,
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         params: {
    //             view: 'notification',
    //             page: 0,
    //             count: 10,
    //         }
    //     }).then(res => setUser({
    //         type: actions.GET_NOTIFICATIONS,
    //         payload: res.data.response
    //     })).catch(error => {
    //         setError(error.message);
    //     });
    // }
    // function loadMoreNotification() {
    //     return axios.get(authApi, {
    //         cancelToken: cancelTokenSource.token,
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         params: {
    //             view: 'notification',
    //             page: user.page + 1,
    //             count: 10,
    //         }
    //     }).then(res => setUser({
    //         type: actions.GET_NOTIFICATIONS,
    //         payload: res.data.response
    //     })).catch(error => {
    //         setError(error.message);
    //     });
    // }


    const contextValues = {
        notify,
        loadMoreNotifications,
        sendNotification,
        receiveNotification
    }
    return (
        <NotificationContextAPI.Provider value={contextValues}>
            {children}
        </NotificationContextAPI.Provider>
    );
}

export const useNotifyContext = () => {
    return useContext(NotificationContextAPI);
}
