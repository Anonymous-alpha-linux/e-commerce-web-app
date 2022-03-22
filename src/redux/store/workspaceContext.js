import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import { mainAPI } from "../../config";
import { useAuthorizationContext } from ".";
import { Loading } from "../../pages";
import {
  initialWorkspacePage,
  workspaceReducer,
  reduxActions as actions,
} from "../reducers";

const WorkspaceContextAPI = createContext();

export default React.memo(function WorkspaceContext({ children }) {
  const [workspaceState, setWorkspace] = useReducer(
    workspaceReducer,
    initialWorkspacePage
  );
  const { user } = useAuthorizationContext();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const cancelTokenSource = axios.CancelToken.source();
  const { REACT_APP_ENVIRONMENT } = process.env;
  const workspaceAPI =
    REACT_APP_ENVIRONMENT === "development"
      ? mainAPI.LOCALHOST_STAFF
      : mainAPI.CLOUD_API_STAFF;

  useEffect(() => {
    if (!workspaceState.page) {
      localStorage.setItem("workspace", 0);
    }
    onLoadWorkspaceList();
  }, []);


  function onLoadWorkspaceList() {
    return axios
      .get(workspaceAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "workspace",
        },
      })
      .then((res) => {
        const index = Number(localStorage.getItem("workspace")) || 0;
        setWorkspace({
          type: actions.GET_WORKSPACE_LIST,
          payload: res.data.response,
        });
        onLoadWorkspace();
      })
      .catch((error) => {
        setWorkspace({
          type: actions.SET_LOADING,
          loading: false,
        });
        setError(error.message);
      });
  }
  function onLoadWorkspace() {
    return axios.get(workspaceAPI, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "myworkspace",
      }
    }).then(res => {
      setWorkspace({
        type: actions.GET_WORKSPACE,
        payload: res.data.response
      })
      onLoadManagerInfo(res.data.response.manger);
    }).catch(err => {
      setError(err.message);
    })
  }
  function onLoadManagerInfo(managerId) {
    return axios
      .get(workspaceAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "manager",
          accountid: managerId,
        },
      })
      .then((res) => {
        const { manager, profile } = res.data.response;
        setWorkspace({
          type: actions.GET_MANAGER,
          payload: {
            ...manager,
            profile,
          },
        });
      })
      .catch((error) => setError(error.message));
  }
  function getWorkspaceMembers(workspaceId) {
    return axios
      .get(workspaceAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "member",
          workspaceid: workspaceId,
        },
      })
      .then((res) =>
        setWorkspace({
          type: actions.GET_WORKSPACE,
        })
      )
      .catch((error) => setError(error.message));
  }
  function selectWorkspaceIndex(page) {
    localStorage.setItem("workspace", page);
    setWorkspace({
      type: actions.SELECT_PAGE,
      page: page,
    });
  }
  function createWorkspace(workspace) {
    setWorkspace({
      type: actions.CREATE_WORKSPACE,
      payload: workspace,
    });
  }
  function getWorkspaceForManager() {
    return axios.get(mainAPI.LOCALHOST_MANAGER, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "workspace",
      }
    }).then(res => setWorkspace({
      type: actions.GET_MANAGER_WORKSPACE,
      payload: res.data.response
    }))
  }
  const contextValue = {
    workspace: workspaceState.workspace,
    workspaces: workspaceState.workspaces,
    loading: workspaceState.workspaceLoading,
    createWorkspace,
    getWorkspaceMembers,
  };
  if (workspaceState.workspaceLoading)
    return <Loading className="workspace__loading"></Loading>;

  return (
    <WorkspaceContextAPI.Provider value={contextValue}>
      {children}
    </WorkspaceContextAPI.Provider>
  );
});

export const useWorkspaceContext = () => {
  return useContext(WorkspaceContextAPI);
};
