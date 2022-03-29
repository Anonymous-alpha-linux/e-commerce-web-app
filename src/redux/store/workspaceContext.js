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
import { initialWorkspacePage, workspaceReducer, reduxActions as actions, } from "../reducers";
import { toastTypes } from "../../fixtures";

const WorkspaceContextAPI = createContext();

export default React.memo(function WorkspaceContext({ children }) {
  const [workspaceState, setWorkspace] = useReducer(workspaceReducer, initialWorkspacePage);
  const { user, pushToast } = useAuthorizationContext();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const cancelTokenSource = axios.CancelToken.source();
  const { REACT_APP_ENVIRONMENT } = process.env;
  const workspaceAPI = REACT_APP_ENVIRONMENT === "development" ? mainAPI.LOCALHOST_STAFF : mainAPI.CLOUD_API_STAFF;
  useEffect(() => {
    if (!workspaceState.page) {
      localStorage.setItem("workspace", 0);
    }
    onLoadWorkspaceList();
  }, [user]);


  function onLoadWorkspaceList() {
    return axios
      .get(workspaceAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "workspace",
          page: 0,
          count: 2,
        },
      })
      .then((res) => {
        if (res.status > 199 && res.status <= 299) {
          setWorkspace({
            type: actions.GET_WORKSPACE_LIST,
            payload: res.data.response,
            others: { totalWorkspace: res.data.totalWorkspace, loadMore: res.data.response.length === workspaceState.count }
          });
          onLoadWorkspace();
        }
        else {
          pushToast({
            message: 'Get workspace information failed',
            type: toastTypes.ERROR
          });
        }
      })
      .catch((error) => {
        pushToast({
          message: 'Get workspace information failed',
          type: toastTypes.ERROR
        });
      });
  }
  function loadMoreWorkspaceList() {
    return axios
      .get(workspaceAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "workspace",
          page: workspaceState.page + 1,
          count: workspaceState.count,
        },
      })
      .then((res) => {
        if (res.status > 199 && res.status <= 299) {
          setWorkspace({
            type: actions.LOAD_MORE_WORKSPACE,
            payload: res.data.response,
            others: { totalWorkspace: res.data.totalWorkspace, page: workspaceState.page + 1, loadMore: res.data.response.length === workspaceState.count }
          });
          onLoadWorkspace();
        }
        else throw new Error(res.data);
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
  function updateWorkspaceById(workspaceId) {
    return axios.get(workspaceAPI, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "workspace",
        workspaceid: workspaceId,
      }
    }).then(res => {
      pushToast({
        message: 'Update workspace successfully!',
        type: toastTypes.SUCCESS
      });
      setWorkspace({
        type: actions.UPDATE_WORKSPACE,
        payload: res.data.response
      });
    }).catch(err => {
      pushToast({
        message: 'Update workspace failed',
        type: toastTypes.ERROR
      });
    });
  }
  function getWorkspaceMembers(workspaceId, cb) {
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
      .then((res) => {
        // setWorkspace({
        //   type: actions.GET_WORKSPACE_MEMBERS,
        //   workspaceId: workspaceId,
        //   payload: res.data.response
        // });
        cb(res.data.response);
      })
      .catch((error) => {
        pushToast({ error: error.message, type: toastTypes.ERROR });
      });
  }
  // function selectWorkspace(workspaceId, cb) {
  //   return axios.put(workspaceAPI, {
  //     workspaceid: workspaceId
  //   }, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //     params: {
  //       view: "accountWorkspace"
  //     },
  //   }).then(res => {
  //     setWorkspace({
  //       type: actions.GET_WORKSPACE,
  //       payload: res.data.response
  //     });
  //   }).catch(err => {

  //   })
  // }
  function createWorkspace(workspace) {
    setWorkspace({
      type: actions.CREATE_WORKSPACE,
      payload: workspace,
    });
  }
  // function getWorkspaceForManager() {
  //   return axios.get(mainAPI.LOCALHOST_MANAGER, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //     params: {
  //       view: "workspace",
  //     }
  //   }).then(res => setWorkspace({
  //     type: actions.GET_MANAGER_WORKSPACE,
  //     payload: res.data.response
  //   }))
  // }
  function assignCoordinatorToWorkspace(workspaceId, accountId, cb) {
    return axios.put(workspaceAPI, {
      accountid: accountId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "assign_workspace_manager",
        workspaceid: workspaceId,
      }
    }).then(res => {
      if (res.status > 199 && res.status <= 299) {
        setWorkspace({
          type: actions.ASSIGN_HOST_TO_WORKSPACE,
          payload: res.data.response,
          workspaceId
        });
        pushToast({
          message: 'Assign successfully',
          type: toastTypes.SUCCESS
        });
        cb();
      }
      else throw new Error(res.data.error);
    }).catch(err => {
      pushToast({
        message: err.message,
        type: toastTypes.ERROR
      });
      cb();
    })
  }
  function assignMemberToWorkspace(workspaceId, accountId, cb) {
    return axios.put(workspaceAPI, {
      accountid: accountId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "assign_workspace_member",
        workspaceid: workspaceId,
      }
    }).then(res => {
      if (res.status > 199 && res.status <= 299) {
        setWorkspace({
          type: actions.ASSIGN_MEMBER_TO_WORKSPACE,
          payload: res.data.response,
          workspaceId,
          accountId
        });
        pushToast({
          message: 'Assign member successfully',
          type: toastTypes.SUCCESS
        });
        cb();
      }
      else throw new Error(res.data.error);
    }).catch(err => {
      pushToast({
        message: err.message,
        type: toastTypes.ERROR
      });
      cb();
    });
  }
  function unassignMemberToWorkspace(workspaceId, accountId, cb) {
    return axios.put(workspaceAPI, {
      accountid: accountId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "unassign_workspace_member",
        workspaceid: workspaceId,
      }
    }).then(res => {
      if (res.status > 199 && res.status <= 299) {
        setWorkspace({
          type: actions.UNASSIGN_MEMBER_FROM_WORKSPACE,
          payload: res.data.response,
          workspaceId,
          accountId
        });
        pushToast({
          message: 'Unassigned member successfully',
          type: toastTypes.SUCCESS
        });
        cb();
      }
      else throw new Error(res.data.error);
    }).catch(err => {
      pushToast({
        message: err.message,
        type: toastTypes.ERROR
      });
      cb();
    });
  }
  function assignRoleToAccount() { }
  function editWorkspace(workspaceId, workTitle, closureTime, eventTime, cb) {
    return axios.put(workspaceAPI, { workTitle, closureTime, eventTime }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "workspace",
        workspaceid: workspaceId,
      }
    }).then(res => {
      if (res.status > 199 && res.status <= 299) {
        setWorkspace({
          type: actions.EDIT_WORKSPACE,
          payload: {
            workTitle,
            expireTime: new Date(closureTime),
            eventTime: new Date(eventTime)
          },
          workspaceId
        });
        pushToast({
          message: "Edited workspace successfully",
          type: toastTypes.SUCCESS,
        });
        if (typeof cb !== 'undefined')
          cb();
      }
      else throw new Error(res.data.error);
    }).catch(err => {
      pushToast({
        message: err.message,
        type: toastTypes.ERROR
      });
      if (typeof cb !== 'undefined')
        cb();
    });
  }

  const contextValue = {
    ...workspaceState,
    workspace: workspaceState.workspace,
    workspaces: workspaceState.workspaces,
    loading: workspaceState.workspaceLoading,
    createWorkspace,
    getWorkspaceMembers,
    assignCoordinatorToWorkspace,
    assignMemberToWorkspace,
    assignRoleToAccount,
    unassignMemberToWorkspace,
    loadMoreWorkspaceList,
    editWorkspace
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
