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
  useEffect(() => {
    // onLoadWorkspace(workspaceState.workspaces[index]._id);
  }, [workspaceState.workspaces]);

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
        console.log(res.data);
        setWorkspace({
          type: actions.GET_WORKSPACE_LIST,
          payload: res.data.response,
        });
        onLoadWorkspace(res.data.response[index]);
      })
      .catch((error) => {
        setWorkspace({
          type: actions.SET_LOADING,
          loading: false,
        });
        setError(error.message);
      });
  }
  function onLoadWorkspace(workspace) {
    onLoadManagerInfo(workspace.manager);
    setWorkspace({
      type: actions.GET_WORKSPACE,
      payload: workspace,
    });
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
  const contextValue = {
    workspace: workspaceState.workspace,
    workspaces: workspaceState.workspaces,
    loading: workspaceState.workspaceLoading,
    createWorkspace,
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
