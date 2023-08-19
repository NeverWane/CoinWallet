import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
export default function LoginSignup() {
    const navigate = useNavigate()

    async function onSignin(ev) {
        ev.preventDefault()
        const data = Object.fromEntries(new FormData(ev.target))
        const users = await userService.query()
        for (const user of users) {
            if (user.username === data.username) {
                if (user.password === data.password) {
                    document.cookie = `coinUser=${JSON.stringify(user)}; expiryDate=${Date.now() + 1000 * 60 * 60 * 24 * 30}; path=/`
                    navigate('/')
                    return
                }
            }
        }
        alert('Username and/or password incorrect!')
    }

    return (
        <section className="login-signup" onSubmit={onSignin}>
            <form className="login-form">
                <label>
                    Username
                    <input type="text" placeholder="Username" name="username" />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Password" name="password" />
                </label>
                <button>Sign in</button>
            </form>
        </section>
    )
}