import { useEffect, useState, useContext } from 'react'
import api from '../../api'
import AuthContext from '../../context/AuthContext'
import AdminEventForm from './AdminEventForm'
import AdminAttendees from './AdminAttendees'

export default function AdminEvents(){
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showAttendeesFor, setShowAttendeesFor] = useState(null)
  const { user } = useContext(AuthContext)

  async function load(){
    setLoading(true)
    try{
      const r = await api.get('/admin/events')
      setEvents(r.data)
    }catch(e){
      console.error(e)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{
    if (!user) return
    load()
  }, [user])

  async function handleCreate(payload){
    try{
      await api.post('/admin/events', payload)
      setShowForm(false)
      await load()
    }catch(e){ console.error(e) }
  }

  async function handleUpdate(id, payload){
    try{
      await api.put(`/admin/events/${id}`, payload)
      setEditing(null)
      setShowForm(false)
      await load()
    }catch(e){ console.error(e) }
  }

  async function handleDelete(id){
    if (!confirm('Delete this event?')) return
    try{
      await api.delete(`/admin/events/${id}`)
      await load()
    }catch(e){ console.error(e) }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Manage Events</h2>
        <div>
          <button className="btn-primary" onClick={()=>{setEditing(null); setShowForm(true)}}>Create event</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="event-grid">
          {events.map(ev=> (
            <div className="event-card" key={ev.id}>
              <div className="event-card-head">
                <strong>{ev.title}</strong>
                <div className="event-actions">
                  <button className="btn-ghost" onClick={()=>{ setEditing(ev); setShowForm(true) }}>Edit</button>
                  <button className="btn-ghost" onClick={()=>handleDelete(ev.id)}>Delete</button>
                  <button className="btn-ghost" onClick={()=>{ setShowAttendeesFor(ev.id) }}>Attendees</button>
                </div>
              </div>
              <div className="event-meta">{ev.date} • {ev.mode} • {ev.venue || '—'}</div>
              <p className="event-desc">{ev.description}</p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AdminEventForm initial={editing} onCancel={()=>setShowForm(false)} onSave={data=>{
          if (editing) return handleUpdate(editing.id, data)
          return handleCreate(data)
        }} />
      )}

      {showAttendeesFor && (
        <AdminAttendees eventId={showAttendeesFor} onClose={()=>setShowAttendeesFor(null)} />
      )}
    </div>
  )
}
