import { useState } from 'react'
import { Link } from 'react-router-dom'
import './GreetingPage.css'

function getGreeting(hours) {
  if (hours < 12) return { text: 'Good Morning', color: 'red' }
  if (hours < 18) return { text: 'Good Afternoon', color: 'green' }
  return { text: 'Good Evening', color: 'blue' }
}

function currentTimeString() {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function GreetingPage() {
  const [time, setTime] = useState(currentTimeString)

  const hours = parseInt(time.split(':')[0], 10)
  const { text, color } = getGreeting(hours)

  return (
    <div className="greeting-page">
      <Link to="/" className="back-link">&larr; Back to Home</Link>

      <h1 className="heading" style={{ color }}>{text}</h1>

      <label className="time-label">
        Pick a time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-picker"
        />
      </label>
    </div>
  )
}

export default GreetingPage
