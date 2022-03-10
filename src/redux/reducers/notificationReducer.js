import actions from './actions';
import ActionHandler from './handleActions';

export const initialNotify = {
    notifications: [],
    newNodes: [],
    user: {},
    loading: true,
    page: 0,
    count: 10,
    more: true,
    filter: 0
}
const notificationReducer = (state, action) => {
    const actionHandler = new ActionHandler(state, action);

    switch (action.type) {
        /*
               1. action.payload: [Array],
               2. action.page: [Number],
               3. action.filter: [Number]
           */
        case actions.PUSH_NOTIFICATION:
            return actionHandler.unshiftItem("notifications", action.payload, {
                page: state.page + 1,
                more: action.payload.length >= state.count
            });
        case actions.GET_NOTIFICATIONS:
            return actionHandler.getListItem("notifications", action.payload, {
                loading: false,
                page: 0,
                count: 10,
                more: action.payload.length >= 10
            });
        case actions.ADD_NEW_NOTIFICATION:
            return actionHandler.unshiftItem("newNodes", action.payload);
        default:
            return state

    }
}
export default notificationReducer;