import { useState, useEffect } from 'react'
import '../styles/ViewLogs.css'

function ViewLogs({ droneId }) {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = 'Drone Logs'

        const fetchLogs = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://createanapiserver-741869911637.asia-southeast1.run.app/logs/${droneId}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch logs')
                }

                const data = await response.json()
                // Sort logs by created date (newest first) and limit to 25
                const sortedLogs = data
                    .sort((a, b) => new Date(b.created) - new Date(a.created))
                    .slice(0, 25)

                setLogs(sortedLogs)
                setError(null)
            } catch (err) {
                console.error('Error fetching logs:', err)
                setError('Failed to load logs. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchLogs()
    }, [droneId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading logs...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()} className="retry-button">
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="logs-container">
            <h2>Temperature Logs</h2>
            <p className="logs-info">Showing the latest {logs.length} logs for Drone ID: {droneId}</p>

            {logs.length === 0 ? (
                <p className="no-logs">No logs found for this drone.</p>
            ) : (
                <div className="table-container">
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Country</th>
                                <th>Drone ID</th>
                                <th>Drone Name</th>
                                <th>Celsius</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{formatDate(log.created)}</td>
                                    <td>{log.country}</td>
                                    <td>{log.drone_id}</td>
                                    <td>{log.drone_name}</td>
                                    <td>{log.celsius}°C</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ViewLogs
