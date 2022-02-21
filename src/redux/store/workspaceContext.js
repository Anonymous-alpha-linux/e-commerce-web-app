import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import { useAuthorizationContext } from '..';
import actions from '../reducers/actions';
import { unstable_batchedUpdates } from "react-dom";

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
                ...action.payload
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

export default function WorkspaceContext({ children }) {
    const [workspaceState, setWorkspace] = useReducer(workspaceReducer, initialWorkspacePage);
    const { user, cancelTokenSource } = useAuthorizationContext();
    console.log(user);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            onLoadWorkspace()
        } catch (error) {
            setError(error.message);
        }
        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    function onLoadWorkspace() {
        // const workspaceAPI = mainAPI.CLOUD_API_STAFF;
        // axios.get(workspaceAPI).then(res => {
        // }).catch(error => setError(error.message));

        axios.get(mainAPI.CLOUD_API_STAFF, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'workspace',
                page: workspaceState.page
            }
        }).then(res => {
            return Promise.resolve(setWorkspace({
                type: actions.WORKSPACE_ACTION,
                payload: res.data.workspace
            }));
        }).catch(error => setError(error.message))
            .finally(setWorkspace({
                type: actions.SET_LOADING,
                loading: false
            }));
    }

    const contextValue = { workspace: workspaceState, loading: workspaceState.workspaceLoading };
    return (
        <WorkspaceContextAPI.Provider value={contextValue}>
            {children}
        </WorkspaceContextAPI.Provider>
    )
}


export const useWorkspaceContext = () => {
    return useContext(WorkspaceContextAPI);
}