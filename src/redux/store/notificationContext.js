import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { mainAPI } from '../../config';
import { notifyData, socketTargets, toastTypes } from '../../fixtures';
import actions from '../reducers/actions';
import { notifyReducer, initialNotify } from '../reducers';
import { useAuthorizationContext } from './authContext';

const NotificationContextAPI = createContext();

export default function NotificationContext({ children }) {
    const { pushToast } = useAuthorizationContext();
    const [showUpdate, setShowUpdate] = useState(true);
    const [notify, setNotify] = useReducer(notifyReducer, initialNotify);
    const { user, socket, setError, setMessage } = useAuthorizationContext();
    const [notifyAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_AUTH, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_AUTH, mainAPI.CLOUD_HOST];
    // const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        if (socket) {
            getSession();
            receiveNotification();
            receiveCommentFromAnother();
            receiveMessageFromAnother();
            handleError()
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

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
        })
            .then(res => {
                setNotify({
                    type: actions.GET_NOTIFICATIONS,
                    payload: res.data.response
                });
            })
            .catch(() => {
                pushToast({
                    message: 'Loading Notifications Failed',
                    type: toastTypes.ERROR
                })
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
        }).catch(() => pushToast({
            message: 'Loading Notifications Failed',
            type: toastTypes.ERROR
        }));
    }
    function getSession() {
        socket.on('session', sessionId => {
            console.log('Your session id:', sessionId);
        });
    }
    function receiveNotification() {
        socket.on('notify', data => {
            setNotify({
                type: actions.ADD_NEW_NOTIFICATION,
                payload: [data]
            })
            setShowUpdate(o => !o);
        });
    }
    function sendNotification(type, url, target) {
        socket.emit("notify", {
            id: user.accountId,
            url: url,
            type: type,
            to: target
        });
    }
    function handleError() {
        socket.on('connect_failed', function (error) {
            setError(error.message);
        })
        socket.on("connect_error", (error) => {
            setError(error.message);
        });
        socket.on('error', error => {
            setError(error.message);
        });
    }
    function handleOffline(handler) {
        socket.volatile.on('notify',
            handler()
        )
    }
    function sendCommentToSpecificPerson(accountId, comment, cb) {
        socket.emit("comment", {
            accountId,
            comment,
        });
    }
    function receiveCommentFromAnother() {
        socket.on("comment", data => {
        });
    }
    function sendMessageToSpecificPerson(accountId, message) {
        socket.emit("private message", {
            accountId,
            message
        });
    }
    function receiveMessageFromAnother() {
        socket.on('private message', message => {
            console.log(message);
        })
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
        loadNotifications,
        loadMoreNotifications,
        sendNotification,
        sendCommentToSpecificPerson,
        sendMessageToSpecificPerson,
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
