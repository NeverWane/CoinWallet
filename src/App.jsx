import { useState, useRef, useEffect } from 'react'
import ContactIndex from './pages/ContactIndex'
import ContactDetails from './pages/ContactDetails'
import AppHeader from './cmps/AppHeader'
import HomePage from './pages/HomePage'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import ContactEdit from './pages/ContactEdit'
import ContactSearch from './pages/ContactSearch'
import Statistics from './pages/Statistics'
import { userService } from './services/user.service'
import LoginSignup from './pages/LoginSignup'
import { useSelector } from 'react-redux'
import { loadUser } from './store/actions/user.actions'

function RouteGuard({ children }) {
  const user = useSelector(state => state.userModule.user)
  if (user) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} />
  }
}

function App() {
  const [page, setPage] = useState('home')
  const user = useSelector(state => state.userModule.user)

  useEffect(() => {
    checkLoggedIn()
  }, [user])

  async function checkLoggedIn() {
    const isLoggedIn = await userService.isLoggedIn()
    if (!user && isLoggedIn) {
      const userId = (await userService.getUser())._id
      loadUser(userId)
    }
  }

  function setCurrentPage(pageName) {
    return () => {
      setPage(pageName)
    }
  }

  return (
    <Router>
      <section className='app-container main-layout'>
        <AppHeader setPage={setCurrentPage} page={page} />
        <Routes>
          <Route path='/' element={<RouteGuard><HomePage /></RouteGuard>} />
          <Route path='/contact' element={<RouteGuard><ContactIndex /></RouteGuard>} />
          <Route path='/contact/:contactId' element={<RouteGuard><ContactDetails /></RouteGuard>} />
          <Route path='/contact/search' element={<RouteGuard><ContactSearch /></RouteGuard>} />
          <Route path='/contact/edit/:contactId?' element={<RouteGuard><ContactEdit /></RouteGuard>} />
          <Route path='/statistics' element={<RouteGuard><Statistics /></RouteGuard>} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
