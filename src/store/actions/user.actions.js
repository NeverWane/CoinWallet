import { userService } from "../../services/user.service"
import { REMOVE_USER, SET_USER_FILTER, SET_USERS, SET_USER, UPDATE_USER, SET_CURR_USER } from "../reducers/user.reducer"
import { store } from "../store"

export async function loadUsers() {
    try {
        const users = await userService.query()
        const action = {
            type: SET_USERS,
            users
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.get(userId)
        const action = {
            type: SET_USER,
            user
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function loadCurrUser(userId) {
    try {
        const user = await userService.get(userId, true)
        const action = {
            type: SET_CURR_USER,
            user
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function addUser(user) {
    try {
        return await userService.save(user)
    } catch (err) {
        throw err
    }
}

export async function login(user) {
    try {
        const userId = await userService.login(user)
        if (userId) {
            await loadUser(userId)
        } else {
            alert('Username and/or password incorrect!')
        }
    } catch (err) {
        throw err
    }
}

export async function removeUser(userId) {
    try {
        const action = {
            type: REMOVE_USER,
            userId
        }
        store.dispatch(action)
        await userService.remove(userId)
    } catch (err) {
        throw err
    }
}

export async function sendFunds(userId, amount) {
    try {
        await userService.sendFunds(userId, amount)
    } catch (err) {
        throw err
    }
}

export async function updateUser(user) {
    try {
        user = await userService.save(user)
        const action = {
            type: UPDATE_USER,
            user
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function setUserFilter(filterBy) {
    try {
        const updatedFilter = userService.setFilterBy(filterBy)
        store.dispatch({ type: SET_USER_FILTER, updatedFilter })
        return updatedFilter
    } catch (err) {
        throw err
    }
}
