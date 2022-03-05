import actions from './actions';

export const initialAuth = {
    accessToken: localStorage.getItem('accessToken') || 'a.b.c',
    isLoggedIn: false,
    authLoading: true,
};
const authReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_LOADING:
            return {
                ...state,
                authLoading: true
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
                authLoading: false
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
        default:
            return state;
    }
}

export default authReducer;