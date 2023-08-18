import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadContact } from "../store/actions/contact.actions"

export default function ContactDetails() {
    const contact = useSelector(state => state.contactModule.contact)
    const { contactId } = useParams()

    useEffect(() => {
        loadContact(contactId)
        
        return () => {
            loadContact(null)
        }
    }, [contactId])

    if (!contact) return (<div>Loading...</div>)
    return (
        <section className="contact-details">
            <NavLink to='/contact'>Back</NavLink>
            <NavLink to={`/contact/edit/${contactId}`}>Edit</NavLink>
            <img className="contact-img" src={contact.imgURL || 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'}>
            </img>
            <div className="contact-name">Name: {contact.name}</div>
            <div className="contact-nick">Nickname: {contact.nickname}</div>
            <div className="contact-phone">Phone: {contact.phone}</div>
            <div className="contact-email">Email: {contact.email}</div>
        </section>
    )
}