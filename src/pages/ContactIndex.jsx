import { useEffect } from "react"
import ContactList from "../cmps/ContactList"
import ContactFilter from "../cmps/ContactFilter"
import { useSearchParams } from "react-router-dom"
import { setContactFilter, loadContacts, removeContact } from "../store/actions/contact.actions"
import { useSelector } from "react-redux"

export default function ContactIndex() {
    const contacts = useSelector(state => state.contactModule.contacts)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setContactFilter(Object.fromEntries(searchParams.entries()))
        loadContacts()
    }, [searchParams])

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

    async function onFilter(ev) {
        const filterBy = await setContactFilter(Object.fromEntries(new FormData(ev.target.form).entries()))
        for (const key in filterBy) {
            if (!filterBy[key]) delete filterBy[key]
        }
        setSearchParams(filterBy, { replace: true })
    }

    if (!contacts) return (<div>Loading...</div>)
    return (
        <section className="contact-index">
            <h2 className="list-header">Contacts</h2>
            <ContactFilter onFilter={onFilter} />
            <ContactList onRemove={onRemoveContact} contacts={contacts} />
        </section>
    )
}