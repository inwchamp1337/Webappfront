// src/pages/ViewConfig.jsx
import { useEffect, useState } from 'react'
import '../styles/ViewConfig.css'
import droneImage from '../assets/drone2d.png'

function ViewConfig({ config }) {
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        document.title = 'Drone Config'
    }, [])

    if (!config) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading configuration...</p>
            </div>
        )
    }

    return (
        <div className="config-container">
            <h2>Drone Configuration</h2>

            <div className="drone-animation-container">
                <div
                    className={`drone-image ${isHovering ? 'hovering' : ''}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img src={droneImage} alt="Drone" />
                    {config.light && <div className="drone-light"></div>}
                </div>
                <div className="drone-shadow"></div>
            </div>

            <div className="config-card">
                <div className="config-item">
                    <span className="label">Drone ID:</span>
                    <span className="value">{config.drone_id}</span>
                </div>
                <div className="config-item">
                    <span className="label">Drone Name:</span>
                    <span className="value">{config.drone_name}</span>
                </div>
                <div className="config-item">
                    <span className="label">Light:</span>
                    <span className={`value light-status ${config.light ? 'on' : 'off'}`}>
                        {config.light ? 'On' : 'Off'}
                    </span>
                </div>
                <div className="config-item">
                    <span className="label">Country:</span>
                    <span className="value">{config.country}</span>
                </div>
            </div>

            <div className="drone-controls">
                <p>Hover over the drone to see it fly!</p>
            </div>
        </div>
    )
}

export default ViewConfig
