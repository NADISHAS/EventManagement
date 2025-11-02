import { useEffect, useState } from 'react'
import api from '../../api'

export default function AdminAttendees({ eventId, onClose }){
  const [regs, setRegs] = useState([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    try{
      const r = await api.get(`/admin/attendees/${eventId}`)
      setRegs(r.data)
    }catch(e){
      console.error(e)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ if (eventId) load() }, [eventId])

  async function updateStatus(regId, status){
    try{
      await api.put(`/admin/attendees/${regId}`, { status })
      await load()
    }catch(e){ console.error(e) }
  }

  return (
    <div className="modal-backdrop">
      <div className="event-form" style={{maxWidth:700}}>
        <h3>Attendees</h3>
        <button className="btn-ghost" onClick={onClose} style={{float:'right'}}>Close</button>
        {loading ? <p>Loading...</p> : (
          <div>
            {regs.length === 0 ? <p>No registrations</p> : (
              <ul style={{listStyle:'none',padding:0}}>
                {regs.map(r=> (
                  <li key={r.id} style={{padding:10,borderBottom:'1px solid #f0f0f5',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:700}}>{r.User?.name || r.User?.email}</div>
                      <div style={{color:'#666'}}>{r.status} • {r.paymentStatus}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      {r.status !== 'confirmed' && <button className="btn-primary" onClick={()=>updateStatus(r.id,'confirmed')}>Approve</button>}
                      {r.status !== 'rejected' && <button className="btn-ghost" onClick={()=>updateStatus(r.id,'rejected')}>Reject</button>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
