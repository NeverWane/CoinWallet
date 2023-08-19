import { storageService } from './async-storage.service.js'
import { contactService } from './contact.service.js'

const USER_KEY = 'userDB'
var gFilterBy = { txt: '' }

export const userService = {
    query,
    get,
    remove,
    save,
    getEmptyUser,
    getFilterBy,
    setFilterBy,
    getUser,
    isLoggedIn,
    login,
    logout,
}

_loadUsers()

async function getUser() {
    const user = JSON.parse(document.cookie?.split('; ')?.find(str => str?.startsWith('coinUser='))?.replace('coinUser=', '') || '{}')
    if (!user) return false
    const savedUser = await get(user._id)
    return savedUser
}

async function isLoggedIn() {
    const user = await getUser()
    if (!user) return false
    const savedUser = await get(user._id)
    if (!savedUser) return false
    return user.username === savedUser.username && user.password === savedUser.password
}

async function login(data) {
    const users = await query()
    for (const user of users) {
        if (user.username === data.username) {
            if (user.password === data.password) {
                document.cookie = `coinUser=${JSON.stringify(user)}; expiryDate=${Date.now() + 1000 * 60 * 60 * 24 * 30}; path=/`
                return user._id
            }
        }
    }
    return false
}

async function logout() {
    document.cookie = `coinUser={}; expiryDate=0; path=/`
}

async function query(filterBy = gFilterBy) {
    let users = await storageService.query(USER_KEY)
    if (!users || !users.length) {
        for (const user of premadeUsers) {
            await storageService.post(USER_KEY, user, 0)
        }
        users = await storageService.query(USER_KEY)
    }
    if (filterBy) {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            users = users.filter(user => regex.test(user.name) || regex.test(user.phone) || regex.test(user.email))
        }
        if (filterBy.username) {
            const regex = new RegExp(filterBy.username, 'i')
            users = users.filter(user => regex.test(user.username))
        }
    }
    return users
}

function get(userId) {
    if (!userId) return
    return storageService.get(USER_KEY, userId)
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

async function save(user) {
    if (user._id) {
        return storageService.put(USER_KEY, user)
    } else {
        const users = await query({ username: user.username })
        return (!users.length) && (await storageService.post(USER_KEY, user))
    }
}

function getEmptyUser(name = '', email = '', phone = '') {
    return { _id: '', username: '', password: '', name, nickname: '', email, phone, coins: 100, contacts: [], moves: [] }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    return gFilterBy = { ...filterBy }
}

async function _loadUsers() {
    let users = await storageService.query(USER_KEY)
    if (!users || !users.length) {
        let defaultUser = {
            username: 'Default',
            password: '123',
            name: 'Default User',
            nickname: 'Default',
            coins: 100,
            phone: '1234567890',
            email: 'default@default.default',
            contacts: [],
            moves: []
        }
        defaultUser = await storageService.post(USER_KEY, defaultUser)
        for (let user of premadeContacts) {
            user.nickname = user.name
            user.username = user.name.replace(' ', '')
            user.password = '123'
            user.contacts = []
            user.moves = []
            user.coins = 100
            user = await storageService.post(USER_KEY, user)
            contactService.save(user, defaultUser)
        }
    }
}

const premadeContacts = [
    {
        "_id": "5a56640269f443a5d64b32ca",
        "name": "Ochoa Hyde",
        "email": "ochoahyde@renovize.com",
        "phone": "+1 (968) 593-3824"
    },
    {
        "_id": "5a5664025f6ae9aa24a99fde",
        "name": "Hallie Mclean",
        "email": "halliemclean@renovize.com",
        "phone": "+1 (948) 464-2888"
    },
    {
        "_id": "5a56640252d6acddd183d319",
        "name": "Parsons Norris",
        "email": "parsonsnorris@renovize.com",
        "phone": "+1 (958) 502-3495"
    },
    {
        "_id": "5a566402ed1cf349f0b47b4d",
        "name": "Rachel Lowe",
        "email": "rachellowe@renovize.com",
        "phone": "+1 (911) 475-2312"
    },
    {
        "_id": "5a566402abce24c6bfe4699d",
        "name": "Dominique Soto",
        "email": "dominiquesoto@renovize.com",
        "phone": "+1 (807) 551-3258"
    },
    {
        "_id": "5a566402a6499c1d4da9220a",
        "name": "Shana Pope",
        "email": "shanapope@renovize.com",
        "phone": "+1 (970) 527-3082"
    },
    {
        "_id": "5a566402f90ae30e97f990db",
        "name": "Faulkner Flores",
        "email": "faulknerflores@renovize.com",
        "phone": "+1 (952) 501-2678"
    },
    {
        "_id": "5a5664027bae84ef280ffbdf",
        "name": "Holder Bean",
        "email": "holderbean@renovize.com",
        "phone": "+1 (989) 503-2663"
    },
    {
        "_id": "5a566402e3b846c5f6aec652",
        "name": "Rosanne Shelton",
        "email": "rosanneshelton@renovize.com",
        "phone": "+1 (968) 454-3851"
    },
    {
        "_id": "5a56640272c7dcdf59c3d411",
        "name": "Pamela Nolan",
        "email": "pamelanolan@renovize.com",
        "phone": "+1 (986) 545-2166"
    },
    {
        "_id": "5a5664029a8dd82a6178b15f",
        "name": "Roy Cantu",
        "email": "roycantu@renovize.com",
        "phone": "+1 (929) 571-2295"
    },
    {
        "_id": "5a5664028c096d08eeb13a8a",
        "name": "Ollie Christian",
        "email": "olliechristian@renovize.com",
        "phone": "+1 (977) 419-3550"
    },
    {
        "_id": "5a5664026c53582bb9ebe9d1",
        "name": "Nguyen Walls",
        "email": "nguyenwalls@renovize.com",
        "phone": "+1 (963) 471-3181"
    },
    {
        "_id": "5a56640298ab77236845b82b",

        "name": "Glenna Santana",
        "email": "glennasantana@renovize.com",
        "phone": "+1 (860) 467-2376"
    },
    {
        "_id": "5a56640208fba3e8ecb97305",
        "name": "Malone Clark",
        "email": "maloneclark@renovize.com",
        "phone": "+1 (818) 565-2557"
    },
    {
        "_id": "5a566402abb3146207bc4ec5",
        "name": "Floyd Rutledge",
        "email": "floydrutledge@renovize.com",
        "phone": "+1 (807) 597-3629"
    },
    {
        "_id": "5a56640298500fead8cb1ee5",
        "name": "Grace James",
        "email": "gracejames@renovize.com",
        "phone": "+1 (959) 525-2529"
    },
    {
        "_id": "5a56640243427b8f8445231e",
        "name": "Tanner Gates",
        "email": "tannergates@renovize.com",
        "phone": "+1 (978) 591-2291"
    },
    {
        "_id": "5a5664025c3abdad6f5e098c",
        "name": "Lilly Conner",
        "email": "lillyconner@renovize.com",
        "phone": "+1 (842) 587-3812"
    }
];