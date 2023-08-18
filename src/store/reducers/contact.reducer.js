export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_CONTACT = 'SET_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const SET_CONTACT_FILTER = 'SET_CONTACT_FILTER'

const initialState = {
    contacts: null,
    contact: null,
    filterBy: {
        txt: ''
    }
}

export function contactReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        case SET_CONTACT:
            return {
                ...state,
                contact: action.contact
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.contact]
            }
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: state.contacts?.filter(contact => contact._id !== action.contactId)
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts?.map(contact => contact._id === action.contact._id ? action.contact : contact)
            }
        case SET_CONTACT_FILTER:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}