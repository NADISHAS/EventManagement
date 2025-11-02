import api from '../../api'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'

export default function AdminDashboard(){
  const [stats, setStats] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    if (!user) return
    api.get('/admin/reports').then(r=>setStats(r.data)).catch(console.error)
  }, [user])

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {!stats ? <p>Loading...</p> : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalEvents}</div>
              <div className="stat-label">Total events</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.totalAttendees}</div>
              <div className="stat-label">Confirmed attendees</div>
            </div>
          </div>

          <section style={{marginTop:20}}>
            <h3>Upcoming Events</h3>
            <div className="event-grid">
              {/* simple preview: reuse admin events list via API */}
              {stats.recentEvents ? stats.recentEvents.map(ev => (
                <div key={ev.id} className="event-card compact">
                  <strong>{ev.title}</strong>
                  <div className="event-meta">{ev.date} • {ev.mode}</div>
                </div>
              )) : <p>No events</p>}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
