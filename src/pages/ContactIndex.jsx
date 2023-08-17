import { useEffect, useRef, useState } from "react"
import { contactService } from "../services/contact.service"
import ContactList from "../cmps/ContactList"
import ContactFilter from "../cmps/ContactFilter"
import { useSearchParams } from "react-router-dom"

export default function ContactIndex() {
    const [contacts, setContacts] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        contactService.setFilterBy(Object.fromEntries(searchParams.entries()))
        loadContacts()
    }, [searchParams])

    async function loadContacts() {
        const contacts = await contactService.query()
        setContacts(contacts)
    }

    function onRemoveContact(contactId) {
        return async () => {
            try {
                setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId))
                contactService.remove(contactId)
            } catch (err) {
                loadContacts()
                console.log('Failed to remove contact')
            }
        }
    }

    function onFilter(ev) {
        const filterBy = contactService.setFilterBy(Object.fromEntries(new FormData(ev.target.form).entries()))
        for (const key in filterBy) {
            if (!filterBy[key]) delete filterBy[key]
        }
        setSearchParams(filterBy, { replace: true })
    }

    if (!contacts) return (<div>Loading...</div>)
    return (
        <section className="contact-index">
            <h2>Contact App</h2>
            <ContactFilter onFilter={onFilter} />
            <ContactList onRemove={onRemoveContact} contacts={contacts} />
        </section>
    )
}