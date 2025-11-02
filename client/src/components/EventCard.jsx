import { Link } from 'react-router-dom'

export default function EventCard({ event, compact=false }){
  return (
    <article className={compact? 'event-card compact' : 'event-card'}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <strong style={{fontSize: compact? '1rem' : '1.1rem'}}>{event.title}</strong>
          <div className="event-meta">{event.date} • {event.mode} • Fee: {Number(event.fee).toFixed(2)}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <Link to={`/event/${event.id}`} className="btn-ghost">View</Link>
        </div>
      </div>
      {!compact && event.description && <p className="event-desc">{event.description}</p>}
    </article>
  )
}
