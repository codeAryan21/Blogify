import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const diapatch = useDispatch(); // It is used as a merger when we have to use redux with react

  // Whenever the application is loaded then we take a useEffect and ask to useEffect that it is loggedIn or not 
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          diapatch(login({ userData }))
        } else {
          diapatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-yellow-50 overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-24 px-2 sm:px-4 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App