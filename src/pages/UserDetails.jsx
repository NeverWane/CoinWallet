import { useEffect, useRef } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { addContact, loadContact, loadContacts, removeContact } from "../store/actions/contact.actions"
import TransferFund from "../cmps/TransferFund"
import { loadCurrUser, sendFunds } from "../store/actions/user.actions"
import MoveList from "../cmps/MoveList"
import ToggleContact from "../cmps/ToggleContact"

export default function UserDetails() {
    const user = useSelector(state => state.userModule.currUser)
    const contacts = useSelector(state => state.contactModule.contacts)
    const { userId } = useParams()

    useEffect(() => {
        loadCurrUser(userId)
        loadContacts()

        return () => {
            loadCurrUser(null)
        }
    }, [userId])

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

    function onAddContact(contactId) {
        return async () => {
            try {
                addContact(contactId)
            } catch (err) {
                loadContacts()
                console.log('Failed to add contact')
            }
        }
    }

    if (!user || !contacts) return (<div>Loading...</div>)
    return (
        <section className="user-details contact-details" key={userId}>
            <NavLink className={'btn btn-back'} to='/contact/search'>Back</NavLink>
            <ToggleContact onRemove={onRemoveContact} onAdd={onAddContact} contactId={userId} contacts={contacts} />
            <img className="user-img" src={user.imgURL || 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'}>
            </img>
            <div className="user-name">Name: {user.name}</div>
            <div className="user-nick">Nickname: {user.nickname}</div>
            <div className="user-phone">Phone: {user.phone}</div>
            <div className="user-email">Email: {user.email}</div>
        </section>
    )
}