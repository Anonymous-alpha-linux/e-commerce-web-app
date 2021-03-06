import actions from "./actions";
import ActionHandler from "./handleActions";

export const initialWorkspacePage = {
  workspace: null,
  workspaces: [],
  workspaceLoading: true,
  workspaceTotal: 0,
  page: 0,
  count: 2,
  loadMore: false,
};
export default function workspaceReducer(state, action) {
  const actionHandler = new ActionHandler(state, action);
  switch (action.type) {
    case actions.GET_WORKSPACE:
      return actionHandler.updateItem("workspace", action.payload, { ...state, workspaceLoading: false });
    case actions.GET_WORKSPACE_LIST:
      return actionHandler.updateItem("workspaces", action.payload, { ...state, ...action.others });
    case actions.LOAD_MORE_WORKSPACE:
      return actionHandler.pushItem("workspaces", action.payload, { ...state, ...action.others });
    case actions.GET_WORKSPACE_MEMBER:
      return actions.updateItem("workspaces", workspace => {
        if (workspace === action.workspaceId) return actionHandler.getListItem("members", action.payload, workspace);
        return workspace;
      }, state);
    case actions.GET_MANAGER:
      return actionHandler.updateItem(
        "workspace",
        actionHandler.updateItem("manager", action.payload, state.workspace),
        { ...state, workspaceLoading: false }
      );
    case actions.SET_LOADING:
      return {
        ...state,
        workspaceLoading: action.loading,
      };
    case actions.CREATE_WORKSPACE:
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload],
      };
    case actions.ASSIGN_HOST_TO_WORKSPACE:
      return actionHandler.updateItem("workspaces", workspace => {
        if (workspace._id === action.workspaceId) return { ...workspace, ...action.payload };
        return workspace;
      }, state);
    case actions.ASSIGN_MEMBER_TO_WORKSPACE:
      return actionHandler.updateItem("workspaces", workspace => {
        if (workspace._id === action.workspaceId) return { ...workspace, ...action.payload };
        return workspace;
      }, state);
    case actions.UNASSIGN_MEMBER_FROM_WORKSPACE:
      return actionHandler.updateItem("workspaces", workspace => {
        if (workspace._id === action.workspaceId) return { ...workspace, ...action.payload };
        return workspace;
      }, state);
    case actions.GET_WORKSPACE_MEMBERS:
      return actionHandler.updateItem("workspaces", workspace => {
        if (workspace._id === action.workspaceId) return { ...workspace, memberDetails: action.payload };
        return workspace;
      });
    case actions.EDIT_WORKSPACE:
      return actionHandler.updateItem("workspaces", workspace => {
        if (workspace._id === action.workspaceId) {
          return { ...workspace, ...action.payload };
        }
        return workspace;
      }, state);
    default:
      return state;
  }
}
