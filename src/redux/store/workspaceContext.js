import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import actions from '../reducers/actions';
import { useAuthorizationContext } from '.';
import { Loading } from '../../pages';

const WorkspaceContextAPI = createContext();
const workspaceReducer = (state, action) => {
    switch (action.type) {
        case actions.GET_WORKSPACE_ACTION:
            return {
                ...state,
                ...action.payload
            };
        case actions.WORKSPACE_ACTION:
            return {
                ...state,
                ...action.payload,
                workspaceLoading: false
            };
        case actions.SET_POST_ACTION:
            return {
                ...state,
                posts: [...state, ...action.payload.posts]
            };
        case actions.SET_LOADING:
            return {
                ...state,
                workspaceLoading: action.loading
            };
        default:
            return state;
    }
}
const initialWorkspacePage = {
    workspace: null,
    posts: [],
    workspaces: [],
    workspaceLoading: true,
    page: 0
}

export default React.memo(function WorkspaceContext({ children }) {
    const [workspaceState, setWorkspace] = useReducer(workspaceReducer, initialWorkspacePage);
    const { user } = useAuthorizationContext();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const cancelTokenSource = axios.CancelToken.source();
    const { REACT_APP_ENVIRONMENT } = process.env;

    useEffect(() => {
        try {
            onLoadWorkspace();
        } catch (error) {
            setError(error.message);
        }
        return () => {
            cancelTokenSource.cancel();
        }
    }, [user]);

    function onLoadWorkspace() {
        const workspaceAPI = REACT_APP_ENVIRONMENT === 'development' ? mainAPI.LOCALHOST_STAFF : mainAPI.CLOUD_API_STAFF;
        axios.get(workspaceAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'workspace',
                page: workspaceState.page
            }
        }).then(res => {
            setWorkspace({
                type: actions.WORKSPACE_ACTION,
                payload: res.data.workspace
            });
        }).catch(error => setError(error.message))
    }

    const contextValue = { workspace: workspaceState, loading: workspaceState.workspaceLoading };
    if (contextValue.loading) return <Loading className="workspace__loading"></Loading>

    return (
        <WorkspaceContextAPI.Provider value={contextValue}>
            {children}
        </WorkspaceContextAPI.Provider>
    )
});


export const useWorkspaceContext = () => {
    return useContext(WorkspaceContextAPI);
}