import { NavLink } from "react-router-dom";

export default function ContactPreview({ contact }) {
    return (
        <NavLink to={`/contact/${contact._id}`} className="contact-preview">
            <img className="contact-img" src={contact.imgURL || 'src/assets/images/contactDefault.png'}>
            </img>
            <div className="contact-name">{ contact.name }</div>
        </NavLink>
    )
}