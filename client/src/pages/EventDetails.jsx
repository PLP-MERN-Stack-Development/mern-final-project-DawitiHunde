import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import API_URL from '../utils/api';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/events/${id}`);
                setEvent(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(
                `${API_URL}/api/registrations`,
                { eventId: id },
                config
            );
            setMessage('Successfully registered for the event!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    if (loading) {
        return <div className="loading">Loading event...</div>;
    }

    if (!event) {
        return <div className="error">Event not found</div>;
    }

    return (
        <div className="event-details-container">
            <div className="event-details-card">
                <h1>{event.title}</h1>
                <p className="event-description">{event.description}</p>

                <div className="event-info">
                    <div className="info-item">
                        <strong>Date:</strong>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <strong>Time:</strong>
                        <span>{new Date(event.date).toLocaleTimeString()}</span>
                    </div>
                    <div className="info-item">
                        <strong>Location:</strong>
                        <span>{event.location}</span>
                    </div>
                    <div className="info-item">
                        <strong>Price:</strong>
                        <span>${event.price}</span>
                    </div>
                    <div className="info-item">
                        <strong>Capacity:</strong>
                        <span>{event.capacity} people</span>
                    </div>
                    <div className="info-item">
                        <strong>Organizer:</strong>
                        <span>{event.organizer?.name}</span>
                    </div>
                </div>

                {message && <div className={message.includes('Success') ? 'success-message' : 'error-message'}>{message}</div>}

                {user?.role !== 'organizer' && (
                    <button onClick={handleRegister} className="btn-primary">
                        Register for Event
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
