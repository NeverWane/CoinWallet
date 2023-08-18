import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { contactReducer } from './reducers/contact.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    contactModule: contactReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store