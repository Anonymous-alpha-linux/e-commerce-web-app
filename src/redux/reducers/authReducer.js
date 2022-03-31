import actions from './actions';

export const initialAuth = {
    accessToken: localStorage.getItem('accessToken') || 'a.b.c',
    isLoggedIn: false,
    authLoading: true,
    profile: null,
    notifications: [],
};
const authReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_LOADING:
            return {
                ...state,
                authLoading: true
            };
        case actions.SET_OFF_LOADING:
            return {
                ...state, authLoading: false,
            };
        case actions.AUTHENTICATE_ACTION:
            return {
                ...state,
                ...action.payload,
                authLoading: false
            };
        case actions.AUTHENTICATE_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                authLoading: false
            };
        case actions.GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case actions.LOGIN_ACTION:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
                authLoading: false
            };
        case actions.LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                authLoading: false
            };
        case actions.FORGET_PASS_ACTION:
            return {
                ...state,
                ...action.payload
            };
        case actions.LOGOUT_ACTION:
            return {
                ...initialAuth,
                authLoading: false
            };
        case actions.PUSH_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            };
        case actions.GET_NOTIFICATIONS:
            console.log(action.payload);
            return {
                ...state,
                notifications: action.payload,
                loadMore: action.payload.length >= 10,
                page: 0,
                count: 10
            };
        case actions.LOAD_MORE_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload.length && [...state.notifications, ...action.payload],
                page: state.page + 1,
                loadMore: action.payload.length >= 10,
            };
        // case actions.CHANGE_CURRENT_WORKSPACE:
        //     return;
        default:
            return state;
    }
}

export default authReducer;