import { contactService } from "../../services/contact.service"
import { REMOVE_CONTACT, SET_CONTACT_FILTER, SET_CONTACTS, SET_CONTACT, UPDATE_CONTACT, ADD_CONTACT } from "../reducers/contact.reducer"
import { store } from "../store"

export async function loadContacts(user = null) {
    try {
        const contacts = await contactService.query(user)
        const action = {
            type: SET_CONTACTS,
            contacts
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function getContacts(user = null) {
    try {
        const contacts = await contactService.query(user)
        return contacts
    } catch (err) {
        throw err
    }
}

export async function loadContact(contactId) {
    try {
        const contact = await contactService.get(contactId)
        const action = {
            type: SET_CONTACT,
            contact
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function removeContact(contactId) {
    try {
        const action = {
            type: REMOVE_CONTACT,
            contactId
        }
        store.dispatch(action)
        await contactService.remove(contactId)
    } catch (err) {
        throw err
    }
}

export async function addContact(contactId) {
    try {
        const contact = { _id: contactId }
        const action = {
            type: ADD_CONTACT,
            contact
        }
        store.dispatch(action)
        await contactService.save(contact)
    } catch (err) {
        throw err
    }
}

export async function updateContact(contact) {
    try {
        contact = await contactService.save(contact)
        const action = {
            type: UPDATE_CONTACT,
            contact
        }
        store.dispatch(action)
    } catch (err) {
        throw err
    }
}

export async function setContactFilter(filterBy) {
    try {
        const updatedFilter = contactService.setFilterBy(filterBy)
        store.dispatch({ type: SET_CONTACT_FILTER, updatedFilter })
        return updatedFilter
    } catch (err) {
        throw err
    }
}
