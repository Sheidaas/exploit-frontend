import auth from '../utils/auth'

let initial_state = {
    username: '',
    apiKey: '',
    isAdmin: 0,
    points: 0,
    premiumEnd: 0
}

function userReducer( state = initial_state, action ) {
    switch ( action.type ) {
        case 'LOGIN': {
            auth.setUserInfo(action.payload, true);
            return action.payload;
        }
        case 'LOGOUT': {
            auth.clearUserInfo();
            return initial_state;
        }
        default: {
            return state
        }
    }
}

export { userReducer, initial_state }