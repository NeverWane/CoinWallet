import { storageService } from "./async-storage.service"

const USER_KEY = 'userDB'

export const userService = {
    getUser,
}

async function getUser() {
    let users = await storageService.query(USER_KEY)
    if (!users || !users.length) {
        const user = {
            name: 'Default User',
            coins: 100,
            moves: []
        }
        await storageService.post(USER_KEY, user)
        users = await storageService.query(USER_KEY)
    }
    return users[0]
}