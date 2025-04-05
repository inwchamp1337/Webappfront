import { useState, useEffect } from 'react'
import '../styles/TemperatureLogForm.css'

function TemperatureLogForm({ config }) {
    const [celsius, setCelsius] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    useEffect(() => {
        document.title = 'Temperature Log Form'
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!config) {
            setMessage({ text: 'Configuration not loaded yet. Please try again later.', type: 'error' })
            return
        }

        if (!celsius || isNaN(parseFloat(celsius))) {
            setMessage({ text: 'Please enter a valid temperature value', type: 'error' })
            return
        }

        setIsSubmitting(true)
        setMessage({ text: '', type: '' })

        try {
            const response = await fetch('https://createanapiserver-741869911637.asia-southeast1.run.app/logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    drone_id: config.drone_id,
                    drone_name: config.drone_name,
                    country: config.country,
                    celsius: parseFloat(celsius)
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit temperature log')
            }

            setCelsius('')
            setMessage({ text: 'Temperature log submitted successfully!', type: 'success' })
        } catch (error) {
            console.error('Error submitting temperature log:', error)
            setMessage({ text: 'Failed to submit temperature log. Please try again.', type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!config) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading configuration...</p>
            </div>
        )
    }

    return (
        <div className="form-container">
            <h2>Temperature Log Form</h2>
            <div className="drone-info">
                <p><strong>Drone ID:</strong> {config.drone_id}</p>
                <p><strong>Drone Name:</strong> {config.drone_name}</p>
                <p><strong>Country:</strong> {config.country}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="celsius">Temperature (°C):</label>
                    <input
                        type="number"
                        id="celsius"
                        value={celsius}
                        onChange={(e) => setCelsius(e.target.value)}
                        placeholder="Enter temperature in Celsius"
                        step="0.1"
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Submitting...' : 'Submit Data'}
                </button>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    )
}

export default TemperatureLogForm
