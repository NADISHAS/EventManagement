import { useState } from 'react'
import api from '../api'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const { login } = useContext(AuthContext)

  const submit = async (e) => {
    e.preventDefault()
    try {
  const res = await api.post('/auth/login', { email, password })
  // Save simple user object and set x-user-id header for subsequent requests
  const user = res.data.user
  login(user)
  setMsg('Logged in')
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
