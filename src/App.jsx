// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import ViewConfig from './pages/ViewConfig'
import TemperatureLogForm from './pages/TemperatureLogForm'
import ViewLogs from './pages/ViewLogs'
import './App.css'

// Icons for navigation
const ConfigIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5A1.5 1.5 0 0 0 10.5 12 1.5 1.5 0 0 0 12 13.5 1.5 1.5 0 0 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM19.43 12.97l2.11 1.66c.19.15.24.42.12.64l-2 3.46c-.12.22-.39.3-.61.22l-2.49-1.01c-.52.4-1.08.73-1.69.98l-.37 2.65c-.04.24-.25.42-.5.42h-4c-.25 0-.46-.18-.5-.42l-.37-2.65c-.61-.25-1.17-.59-1.69-.98l-2.49 1.01c-.22.08-.49 0-.61-.22l-2-3.46a.493.493 0 0 1 .12-.64l2.11-1.66L4.5 12l.07-.97-2.11-1.66a.493.493 0 0 1-.12-.64l2-3.46c.12-.22.39-.31.61-.22l2.49 1c.52-.39 1.08-.73 1.69-.98l.37-2.65c.04-.24.25-.42.5-.42h4c.25 0 .46.18.5.42l.37 2.65c.61.25 1.17.59 1.69.98l2.49-1c.22-.09.49 0 .61.22l2 3.46c.12.22.07.49-.12.64L19.43 11.03l.07.97-.07.97z" />
  </svg>
)

const FormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
  </svg>
)

const LogsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14H7v-2h3v2zm0-4H7v-2h3v2zm0-4H7V7h3v2zm4 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2zm4 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2z" />
  </svg>
)

function NavItem({ to, icon, label, isActive }) {
  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link to={to}>
        <div className="nav-icon">{icon}</div>
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  )
}

function Navigation() {
  const location = useLocation()

  return (
    <nav className="side-nav">
      <div className="nav-brand">
        <div className="drone-logo">
          <span className="drone-wing left"></span>
          <span className="drone-body"></span>
          <span className="drone-wing right"></span>
        </div>
        <h2>Drone Control</h2>
      </div>
      <ul>
        <NavItem
          to="/"
          icon={<ConfigIcon />}
          label="View Config"
          isActive={location.pathname === '/'}
        />
        <NavItem
          to="/temperature-log"
          icon={<FormIcon />}
          label="Temperature Log"
          isActive={location.pathname === '/temperature-log'}
        />
        <NavItem
          to="/logs"
          icon={<LogsIcon />}
          label="View Logs"
          isActive={location.pathname === '/logs'}
        />
      </ul>
      <div className="nav-footer">
        <div className="drone-id">ID: {import.meta.env.VITE_DRONE_ID || '3001'}</div>
      </div>
    </nav>
  )
}

function App() {
  const [config, setConfig] = useState(null)
  const droneId = import.meta.env.VITE_DRONE_ID

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`https://createanapiserver-741869911637.asia-southeast1.run.app/configs/${droneId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch config')
        }
        const data = await response.json()
        setConfig(data)
      } catch (error) {
        console.error('Error fetching config:', error)
      }
    }

    fetchConfig()
  }, [droneId])

  return (
    <Router>
      <div className="app-container">
        <div className="content-wrapper">
          <Navigation />
          <main>

            <div className="page-content">
              <Routes>
                <Route path="/" element={<ViewConfig config={config} />} />
                <Route path="/temperature-log" element={<TemperatureLogForm config={config} />} />
                <Route path="/logs" element={<ViewLogs droneId={droneId} />} />
              </Routes>
            </div>
          </main>
        </div>

      </div>
    </Router>
  )
}

export default App
