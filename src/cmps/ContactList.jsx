import { NavLink } from "react-router-dom"
import ContactPreview from "./ContactPreview"
export default function ContactList({ contacts, onRemove, ...props }) {
    if (!contacts || props.onAdd && !props.currContacts) return
    return (
        <ul className="contact-list">
            {props.onAdd &&
                <li className="contact-item">
                    <NavLink to='/contact'>Return</NavLink>
                </li> ||
                <li className="contact-item">
                    <NavLink to='/contact/search'>Add contact</NavLink>
                </li>}
            {contacts.map(contact => {
                return (
                    <li className="contact-item" key={contact._id}>
                        <ContactPreview contact={contact} />
                        {props.onAdd && props.currContacts.findIndex(currContact => currContact._id === contact._id) === -1
                            && <button onClick={props.onAdd(contact._id)} className="btn btn-add">Add</button>
                            || <button onClick={onRemove(contact._id)} className="btn btn-remove">Remove</button>
                        }
                    </li>
                )
            })}
        </ul>
    )
}