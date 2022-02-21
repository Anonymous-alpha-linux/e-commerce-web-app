export const initialState = {
    accessToken: localStorage.getItem('accessToken'),
    account: '',
    role: '',
    isLoggedIn: false,
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'input':

            break;

        default:
            break;
    }
}

export default authReducer;