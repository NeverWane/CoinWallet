import { userService } from './user.service.js'
var gContactFilter = { txt: '' }

export const contactService = {
    query,
    remove,
    save,
    get,
    getFilterBy,
    setFilterBy,
}

async function query(loggedInUser = null, filterBy = gContactFilter) {
    if (!loggedInUser) {
        loggedInUser = await userService.get((await userService.getUser())?._id)
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    let fullContacts = []
    for (const contact of loggedInUser.contacts) {
        const user = await userService.get(contact._id)
        if (!user) continue
        const fullContact = {
            _id: contact._id,
            name: user.name,
            nickname: contact.nickname || user.nickname,
            phone: user.phone,
            email: user.email,
            imgUrl: user.imgUrl
        }
        fullContacts.push(fullContact)
    }
    if (filterBy) {
        if (filterBy._id) {
            return fullContacts.filter(contact => contact._id === filterBy._id)[0]
        }
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            fullContacts = fullContacts.filter(contact => regex.test(contact.name) || regex.test(contact.nickname) || regex.test(contact.phone) || regex.test(contact.email))
        }
    }
    return fullContacts
}

async function remove(contactId, loggedInUser = null) {
    if (!loggedInUser) {
        loggedInUser = await userService.get((await userService.getUser())?._id)
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    loggedInUser.contacts = loggedInUser.contacts.filter(contact => contact._id !== contactId)
    return userService.save(loggedInUser)
}

async function save(contact, loggedInUser = null) {
    if (!loggedInUser) {
        loggedInUser = await userService.get((await userService.getUser())?._id)
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    let newContact = { _id: contact._id }
    for (const currContact of loggedInUser.contacts) {
        if (contact.nickname && currContact._id === contact._id) {
            currContact.nickname = contact.nickname
            newContact = null
            break
        }
    }
    if (newContact) {
        loggedInUser.contacts.push(newContact)
    }
    return userService.save(loggedInUser)
}

async function get(contactId) {
    return contactId && query(null, { _id: contactId })
}

function getFilterBy() {
    return { ...gContactFilter }
}

function setFilterBy(filterBy = {}) {
    return gContactFilter = { ...filterBy }
}