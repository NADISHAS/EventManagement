import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function EventDetail() {
  const { id } = useParams()
  const [ev, setEv] = useState(null)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    api.get(`/events/${id}`).then(r=>setEv(r.data)).catch(console.error)
  }, [id])

  const register = async () => {
    try {
      const userJson = localStorage.getItem('user')
      if (!userJson) return setMsg('Please login first')
      const user = JSON.parse(userJson)
      // ensure header is set
      api.defaults.headers.common['x-user-id'] = String(user.id)
      await api.post(`/events/${id}/register`)
      setMsg('Registration submitted')
      // navigate to My Events so user can see their registrations
      navigate('/my-events')
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Failed')
    }
  }

  if (!ev) return <div>Loading...</div>

  return (
    <div className="container">
      <h2>{ev.title}</h2>
      <div>{ev.date} • {ev.time} • {ev.mode}</div>
      <p>{ev.description}</p>
      <div>Venue: {ev.venue}</div>
      <div>Fee: {ev.fee}</div>
      <button onClick={register}>Register</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}
