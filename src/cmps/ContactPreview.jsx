import { NavLink } from "react-router-dom";

export default function ContactPreview({ contact }) {
    return (
        <NavLink to={`/contact/${contact._id}`} className="contact-preview">
            <img className="contact-img" src={contact.imgURL || 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'}>
            </img>
            <div className="contact-name">{ contact.name }</div>
        </NavLink>
    )
}