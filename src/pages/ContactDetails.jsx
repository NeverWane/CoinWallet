import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadContact } from "../store/actions/contact.actions"
import TransferFund from "../cmps/TransferFund"
import { sendFunds } from "../store/actions/user.actions"
import MoveList from "../cmps/MoveList"

export default function ContactDetails() {
    const contact = useSelector(state => state.contactModule.contact)
    const { contactId } = useParams()

    useEffect(() => {
        loadContact(contactId)
        
        return () => {
            loadContact(null)
        }
    }, [contactId])

    async function onTransfer(ev) {
        ev.preventDefault()
        try {
            await sendFunds(contactId, (new FormData(ev.target)).get('amount'))
            loadContact(contactId)
        } catch (err) {
            console.log('Failed to transfer funds')
        }
    }

    function getMoves() {
        return contact.moves.slice(0, 3)
    }

    if (!contact) return (<div>Loading...</div>)
    return (
        <section className="contact-details">
            <NavLink className={'btn btn-back'} to='/contact'>Back</NavLink>
            <NavLink className={'btn btn-edit'} to={`/contact/edit/${contactId}`}>Edit</NavLink>
            <img className="contact-img" src={contact.imgURL || 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'}>
            </img>
            <div className="contact-name">Name: {contact.name}</div>
            <div className="contact-nick">Nickname: {contact.nickname}</div>
            <div className="contact-phone">Phone: {contact.phone}</div>
            <div className="contact-email">Email: {contact.email}</div>
            <TransferFund user={contact} onTransfer={onTransfer} />
            <MoveList moves={getMoves()} />
        </section>
    )
}