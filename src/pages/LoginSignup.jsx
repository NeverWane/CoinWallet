import { useEffect } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { loadUser } from "../store/actions/user.actions"
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
            const userId = await userService.login(data)
            if (userId) {
                await loadUser(userId)
            } else {
                alert('Username and/or password incorrect!')
            }
        } catch(err) {
            throw err
        }
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