import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { contactService } from "../services/contact.service"

export default function ContactEdit() {
    const [contact, setContact] = useState()
    const navigate = useNavigate()
    const { contactId } = useParams()

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contact = await contactService.get(contactId) || contactService.getEmptyContact()
        setContact(contact)
    }

    async function onSave(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(new FormData(ev.target).entries())
        let savedContact = { ...contact, ...data }
        try {
            savedContact = await contactService.save(savedContact)
            navigate(`/contact/${savedContact._id}`)
        } catch (err) {
            console.log('Error while saving contact')
            navigate('/')
        }
    }

    if (contactId && !contact) return (<div>Loading...</div>)
    return (
        <section className="contact-edit">
            <NavLink to='/contact'>Back</NavLink>
            <img className="contact-img" src={contact?.imgURL || 'src/assets/images/contactDefault.png'}>
            </img>
            <form onSubmit={onSave}>
                <label htmlFor="name">Name</label>
                <input className="contact-name" defaultValue={contact?.name || ''} name="name" />
                <label htmlFor="phone">Phone</label>
                <input className="contact-phone" defaultValue={contact?.phone || ''} name="phone" />
                <label htmlFor="email">Email</label>
                <input className="contact-email" defaultValue={contact?.email || ''} name="email" />
                <button>Save</button>
            </form>
        </section>
    )
}