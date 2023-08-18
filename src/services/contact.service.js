import { userService } from './user.service.js'
var gContactFilter = { txt: '' }

export const contactService = {
    query,
    remove,
    save,
    getFilterBy,
    setFilterBy,
}

async function query(loggedInUser = null) {
    if (!loggedInUser) {
        loggedInUser = await userService.getUser()
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    let fullContacts = []
    for (const contact of loggedInUser.contacts) {
        const user = await userService.get(contact._id)
        if (!user) continue
        const fullContact = {
            _id: contact._id,
            name: user.name,
            nickname: contact.nickname ?? user.nickname,
            phone: user.phone,
            email: user.email,
            imgUrl: user.imgUrl
        }
        fullContacts.push(fullContact)
    }
    const regex = new RegExp(gContactFilter.txt, 'i')
    fullContacts = fullContacts.filter(contact => regex.test(contact.name) || regex.test(contact.nickname) || regex.test(contact.phone) || regex.test(contact.email))
    return fullContacts
}

async function remove(contactId, loggedInUser = null) {
    if (!loggedInUser) {
        loggedInUser = await userService.getUser()
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    loggedInUser.contacts = loggedInUser.contacts.filter(contact => contact._id !== contactId)
    return userService.save(loggedInUser)
}

async function save(contact, loggedInUser = null) {
    if (!loggedInUser) {
        loggedInUser = await userService.getUser()
    }
    if (!loggedInUser || !loggedInUser.contacts) return
    const newContact = { _id: contact._id }
    for (const currContact of loggedInUser.contacts) {
        if (contact.nickname && currContact._id === contact._id) {
            newContact.nickname = contact.nickname
        }
    }
    loggedInUser.contacts.push(newContact)
    return userService.save(loggedInUser)
}

function getFilterBy() {
    return { ...gContactFilter }
}

function setFilterBy(filterBy = {}) {
    return gContactFilter = { ...filterBy }
}