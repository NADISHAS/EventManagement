import { useState } from 'react'
import api from '../api'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const { login } = useContext(AuthContext)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', { name, email, password })
      const user = res.data.user
      login(user)
      setMsg('Registered and logged in')
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <h2>Register</h2>
        <form onSubmit={submit} className="auth-form">
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="form-actions-center">
            <button type="submit" className="btn-primary">Register</button>
          </div>
        </form>
        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </div>
  )
}
