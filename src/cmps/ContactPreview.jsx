import { NavLink } from "react-router-dom";
const defaultUrl = 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'
export default function ContactPreview({ contact }) {
    return (
        <NavLink to={`/contact/${contact._id}`} className="contact-preview">
            <img className="contact-img" src={contact.imgURL || defaultUrl }>
            </img>
            <div className="contact-name">{ contact.name }</div>
        </NavLink>
    )
}