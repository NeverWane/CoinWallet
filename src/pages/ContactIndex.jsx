import { useEffect, useRef, useState } from "react"
import { userService } from "../services/user.service"
import ContactList from "../cmps/ContactList"
import ContactFilter from "../cmps/ContactFilter"
import { useSearchParams } from "react-router-dom"

export default function ContactIndex() {
    const [contacts, setContacts] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        userService.setFilterBy(Object.fromEntries(searchParams.entries()))
        loadContacts()
    }, [searchParams])

    async function loadContacts() {
        const contacts = await userService.query()
        setContacts(contacts)
    }

    function onRemoveContact(contactId) {
        return async () => {
            try {
                setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId))
                userService.remove(contactId)
            } catch (err) {
                loadContacts()
                console.log('Failed to remove contact')
            }
        }
    }

    function onFilter(ev) {
        const filterBy = userService.setFilterBy(Object.fromEntries(new FormData(ev.target.form).entries()))
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