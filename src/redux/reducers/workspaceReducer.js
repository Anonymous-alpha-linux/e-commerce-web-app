import actions from "./actions";
import ActionHandler from "./handleActions";

export const initialWorkspacePage = {
  workspace: null,
  workspaces: [],
  workspaceLoading: true,
  page: localStorage.getItem("workspace"),
};
export default function workspaceReducer(state, action) {
  const actionHandler = new ActionHandler(state, action);
  switch (action.type) {
    case actions.GET_WORKSPACE:
      return actionHandler.updateItem("workspace", action.payload, state);
    case actions.GET_WORKSPACE_LIST:
      return actionHandler.updateItem("workspaces", action.payload, state);
    case actions.GET_WORKSPACE_MEMBER:
      return actions.updateItem("workspaces", workspace => {
        if (workspace === action.workspaceId) return actionHandler.getListItem("members", action.payload, workspace);
        return workspace;
      }, state)
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
    default:
      return state;
  }
}
