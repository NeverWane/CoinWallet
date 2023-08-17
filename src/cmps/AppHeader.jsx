import { NavLink } from "react-router-dom"

export default function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-content grid column">
                <NavLink to='/' className="logo">CoinWallet</NavLink>
                <nav className="navbar grid column">
                    <NavLink to='/' className={`nav-item nav-home`}>Home</NavLink>
                    <NavLink to='/contact' className={`nav-item nav-contact`}>Contacts</NavLink>
                    <NavLink to='/statistics' className={`nav-item nav-stat`}>Statistics</NavLink>
                    {/* <NavLink to='/' className={`nav-item nav-home ${page === 'home' ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to='/contact' className={`nav-item nav-contact ${page === 'contact' ? 'active' : ''}`}>Contacts</NavLink>
                    <NavLink to='/statistics' className={`nav-item nav-stat ${page === 'stat' ? 'active' : ''}`}>Statistics</NavLink> */}
                </nav>
            </section>
        </header>
    )
}