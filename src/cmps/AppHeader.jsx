import { NavLink, useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { useSelector } from "react-redux"
import { loadUser } from "../store/actions/user.actions"
export default function AppHeader() {
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

    async function onLog() {
        if (user) {
            userService.logout()
            loadUser(null)
        } else {
            navigate('/')
        }
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-content grid column">
                <NavLink to='/' className="logo">CoinWallet</NavLink>
                <nav className="navbar grid column">
                    <NavLink to='/' className={`nav-item nav-home`}>Home</NavLink>
                    <NavLink to='/contact' className={`nav-item nav-contact`}>Contacts</NavLink>
                    <NavLink to='/statistics' className={`nav-item nav-stat`}>Statistics</NavLink>
                    <button className="nav-item btn-log" onClick={onLog}>
                        {user && 'Logout' || 'Login'}
                    </button>
                </nav>
            </section>
        </header>
    )
}