import { useEffect } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { addUser, login } from "../store/actions/user.actions"
import { useSelector } from "react-redux"
export default function LoginSignup() {
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    async function onSignin(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(new FormData(ev.target))
        try {
            await login(data)
        } catch (err) {
            throw err
        }
    }

    async function onSignup(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(new FormData(ev.target))
        try {
            let user = { ...userService.getEmptyUser(), ...data }
            user = await addUser(user)
            if (user) {
                await login(user)
            } else {
                alert('Username already taken!')
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <section className="login-signup grid column">
            <form className="login-form grid" onSubmit={onSignin}>
                <h2>Login</h2>
                <label>
                    Username
                    <input type="text" placeholder="Username" name="username" defaultValue={'Default'} />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Password" name="password" defaultValue={'123'} />
                </label>
                <button className="btn btn-sign">Sign in</button>
            </form>
            <form className="signup-form grid" onSubmit={onSignup}>
                <h2>Signup</h2>
                <label>
                    Username
                    <input type="text" required={true} placeholder="Username" name="username" />
                </label>
                <label>
                    Password
                    <input type="password" required={true} placeholder="Password" name="password" />
                </label>
                <label>
                    Name
                    <input type="name" required={true} placeholder="Name" name="name" />
                </label>
                <label>
                    Nickname
                    <input type="nickname" required={true} placeholder="Nickname" name="nickname" />
                </label>
                <label>
                    Phone
                    <input type="phone" required={true} placeholder="Phone" name="phone" />
                </label>
                <label>
                    Email
                    <input type="email" required={true} placeholder="Email" name="email" />
                </label>
                <button className="btn btn-sign">Sign up</button>
            </form>
        </section>
    )
}