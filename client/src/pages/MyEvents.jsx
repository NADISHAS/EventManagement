import { useEffect, useState, useContext } from 'react'
import api from '../api'
import AuthContext from '../context/AuthContext'
import EventCard from '../components/EventCard'

export default function MyEvents(){
  const [regs, setRegs] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    if (!user) return
    // Call new backend endpoint that returns registrations with event included
    api.get('/events/my-registrations').then(r=>{
      setRegs(r.data || [])
    }).catch(console.error)
  }, [user])

  return (
    <div>
      <h2>My Events</h2>
      {regs.length === 0 ? (
        <p>You have no registrations yet. Browse events to register.</p>
      ) : (
        <div className="event-grid">
          {regs.map(reg => (
            <div key={reg.id} className="event-card">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                  <strong>{reg.Event?.title}</strong>
                  <div className="event-meta">{reg.Event?.date} • {reg.Event?.mode}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'0.9rem',color:'var(--muted)'}}>{reg.status}</div>
                </div>
              </div>
              <p className="event-desc">{reg.Event?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
