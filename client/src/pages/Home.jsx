import { useEffect, useState } from 'react'
import api from '../api'
import EventCard from '../components/EventCard'

export default function Home() {
  const [events, setEvents] = useState([])
  const [q, setQ] = useState('')
  const [mode, setMode] = useState('all')

  useEffect(() => {
    api.get('/events').then(r => setEvents(r.data)).catch(console.error)
  }, [])

  const filtered = events.filter(ev => {
    if (mode !== 'all' && ev.mode !== mode) return false
    if (!q) return true
    const s = q.toLowerCase()
    return (ev.title||'').toLowerCase().includes(s) || (ev.description||'').toLowerCase().includes(s)
  })

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Upcoming Events</h2>
        <div className="search-bar">
          <input placeholder="Search events" value={q} onChange={e=>setQ(e.target.value)} />
          <select value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <div className="event-grid">
          {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
        </div>
      )}
    </div>
  )
}
