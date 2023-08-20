import { useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { loadContact, updateContact } from "../store/actions/contact.actions"
import { useSelector } from "react-redux"

export default function ContactEdit() {
    const contact = useSelector(state => state.contactModule.contact)
    const { contactId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact(contactId)
        
        return () => {
            loadContact(null)
        }
    }, [contactId])

    async function onSave(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(new FormData(ev.target).entries())
        try {
            await updateContact({ _id: contactId, ...data })
            navigate(`/contact/${contactId}`)
        } catch (err) {
            console.log('Error while saving contact')
            navigate(`/contact/${contactId}`)
        }
    }

    if (contactId && !contact) return (<div>Loading...</div>)
    return (
        <section className="contact-edit grid">
            <NavLink className={'btn btn-back'} to='/contact'>Back</NavLink>
            <img className="contact-img" src={contact?.imgURL || 'https://res.cloudinary.com/dpv9yspqs/image/upload/v1692266679/CoinWallet/userDefault_fb4jz5.png'}>
            </img>
            <form onSubmit={onSave}>
                <div className="contact-name">Name: {contact.name}</div>
                <label htmlFor="nickname">Nickname: </label>
                <input type="text" className="contact-nick" placeholder={contact?.nickname || ''} name="nickname" />
                <div className="contact-phone">Phone: {contact.phone}</div>
                <div className="contact-email">Email: {contact.email}</div>
                <button>Save</button>
            </form>
        </section>
    )
}