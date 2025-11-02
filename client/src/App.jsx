import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EventDetail from './pages/EventDetail'
import MyEvents from './pages/MyEvents'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminEvents from './pages/admin/AdminEvents'
import Layout from './components/Layout'
import { useContext } from 'react'
import AuthContext from './context/AuthContext'

export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetail />} />
        {user && <Route path="/my-events" element={<MyEvents />} />}

        {user && user.role === 'admin' && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
          </>
        )}
      </Routes>
    </Layout>
  )
}
