import { useState, useRef } from 'react'
import ContactIndex from './pages/ContactIndex'
import ContactDetails from './pages/ContactDetails'
import AppHeader from './cmps/AppHeader'
import HomePage from './pages/HomePage'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import ContactEdit from './pages/ContactEdit'
import ContactSearch from './pages/ContactSearch'
function App() {
  const [page, setPage] = useState('home')

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
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<ContactIndex />} />
          <Route path='/contact/:contactId' element={<ContactDetails />} />
          <Route path='/contact/search' element={<ContactSearch />} />
          <Route path='/contact/edit/:contactId?' element={<ContactEdit />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
