import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Nav(){
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="nav-root">
      <div className="nav-left">
        <Link className="brand" to="/">EventManager</Link>
      </div>
      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === 'user' && (
          <>
            <Link to="/">Browse</Link>
            <Link to="/my-events">My Events</Link>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/events">Events</Link>
          </>
        )}

        {user && (
          <>
            <span className="nav-user">{user.name || user.email}</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
