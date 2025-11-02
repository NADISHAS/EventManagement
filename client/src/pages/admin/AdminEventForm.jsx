import { useState, useEffect } from 'react'

export default function AdminEventForm({ initial = null, onCancel, onSave }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [mode, setMode] = useState('online')
  const [maxAttendees, setMaxAttendees] = useState(0)
  const [fee, setFee] = useState(0)

  useEffect(()=>{
    if (initial) {
      setTitle(initial.title || '')
      setDescription(initial.description || '')
      setDate(initial.date ? initial.date.slice(0,10) : '')
      setTime(initial.time || '')
      setVenue(initial.venue || '')
      setMode(initial.mode || 'online')
      setMaxAttendees(initial.maxAttendees || 0)
      setFee(initial.fee || 0)
    }
  }, [initial])

  function submit(e){
    e.preventDefault()
    const payload = { title, description, date, time, venue, mode, maxAttendees: Number(maxAttendees), fee: Number(fee) }
    onSave(payload)
  }

  return (
    <div className="modal-backdrop">
      <form className="event-form" onSubmit={submit}>
        <h3>{initial ? 'Edit Event' : 'Create Event'}</h3>
        <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} required/></label>
        <label>Description<textarea value={description} onChange={e=>setDescription(e.target.value)} /></label>
        <div className="row">
          <label>Date<input type="date" value={date} onChange={e=>setDate(e.target.value)} required/></label>
          <label>Time<input type="time" value={time} onChange={e=>setTime(e.target.value)} /></label>
        </div>
        <label>Venue<input value={venue} onChange={e=>setVenue(e.target.value)} /></label>
        <div className="row">
          <label>Mode<select value={mode} onChange={e=>setMode(e.target.value)}><option>online</option><option>offline</option></select></label>
          <label>Max Attendees<input type="number" value={maxAttendees} onChange={e=>setMaxAttendees(e.target.value)} /></label>
          <label>Fee<input type="number" step="0.01" value={fee} onChange={e=>setFee(e.target.value)} /></label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  )
}
