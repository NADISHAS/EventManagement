import Nav from './Nav'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Layout({ children }){
  const { user } = useContext(AuthContext)

  return (
    <div className="app-shell">
      <Nav />
      <div className="app-content">
        <aside className="sidebar">
          <div style={{marginBottom:12,fontWeight:700}}>Quick Links</div>
          <div>
            <Link to="/">Browse Events</Link>
          </div>
          {user && user.role === 'user' && (
            <div><Link to="/my-events">My Registrations</Link></div>
          )}
          {user && user.role === 'admin' && (
            <>
              <div><Link to="/admin/dashboard">Admin Dashboard</Link></div>
              <div><Link to="/admin/events">Manage Events</Link></div>
            </>
          )}
          {!user && (
            <div style={{marginTop:12}}><Link to="/login">Sign in to manage registrations</Link></div>
          )}
        </aside>

        <main className="main-panel">
          {children}
        </main>
      </div>
      <footer className="app-footer">© {new Date().getFullYear()} EventManager</footer>
    </div>
  )
}
