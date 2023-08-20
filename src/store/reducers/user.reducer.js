export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const SET_CURR_USER = 'SET_CURR_USER'
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USER_FILTER = 'SET_USER_FILTER'

const initialState = {
    users: null,
    user: null,
    currUser: null,
    filterBy: {
        txt: ''
    }
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_CURR_USER:
            return {
                ...state,
                currUser: action.user
            }
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users?.filter(user => user._id !== action.userId)
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users?.map(user => user._id === action.user._id ? action.user : user)
            }
        case SET_USER_FILTER:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}