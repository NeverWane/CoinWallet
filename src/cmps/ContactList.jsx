import { NavLink } from "react-router-dom"
import ContactPreview from "./ContactPreview"
export default function ContactList({ contacts, onRemove }) {

    if (!contacts) return
    return (
        <ul className="contact-list">
        <li className="contact-item">
            <NavLink to='/contact/edit'>Add contact</NavLink>
        </li>
            {contacts.map(contact => {
                return (
                    <li className="contact-item" key={contact._id}>
                        <ContactPreview contact={contact} />
                        <button onClick={onRemove(contact._id)} className="btn btn-remove">x</button>
                    </li>
                )
            })}
        </ul>
    )
}