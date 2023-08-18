import { useEffect, useState } from "react"
import ContactList from "../cmps/ContactList"
import ContactFilter from "../cmps/ContactFilter"
import { useSearchParams } from "react-router-dom"
import { setContactFilter, loadContacts, removeContact, getContacts, addContact } from "../store/actions/contact.actions"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"

export default function ContactSearch() {
    const currContacts = useSelector(state => state.contactModule.contacts)
    const [searchParams, setSearchParams] = useSearchParams()
    const [contacts, setContacts] = useState()

    useEffect(() => {
        setContactFilter(Object.fromEntries(searchParams.entries()))
        loadFullContacts()
    }, [searchParams])

    async function loadFullContacts() {
        try {
            setContacts(null)
            await loadContacts()
            const userId = (await userService.getUser())?._id
            let contacts = await getContacts(true)
            contacts = contacts.filter(contact => contact._id !== userId)
            setContacts(contacts)
        } catch(err) {
            console.log('Failed to load users')
        }
    }

    async function onFilter(ev) {
        const filterBy = await setContactFilter(Object.fromEntries(new FormData(ev.target.form).entries()))
        for (const key in filterBy) {
            if (!filterBy[key]) delete filterBy[key]
        }
        setSearchParams(filterBy, { replace: true })
    }

    function onRemoveContact(contactId) {
        return async () => {
            try {
                removeContact(contactId)
            } catch (err) {
                loadContacts()
                console.log('Failed to remove contact')
            }
        }
    }

    function onAddContact(contactId) {
        return async () => {
            try {
                addContact(contactId)
            } catch (err) {
                loadContacts()
                console.log('Failed to add contact')
            }
        }
    }
    return (
        <section className="contact-index">
            <ContactFilter onFilter={onFilter} key={'full'} />
            {contacts && currContacts &&
            <ContactList onRemove={onRemoveContact} onAdd={onAddContact} contacts={contacts} currContacts={currContacts} />
            || <div>Loading...</div>
            }
        </section>
    )
}