import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import API_URL from '../utils/api';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/events`);
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <div className="loading">Loading events...</div>;
    }

    return (
        <div className="home-container">
            <div className="hero">
                <h1>Discover Amazing Events</h1>
                <p>Find and register for events that interest you</p>
                {user?.role === 'organizer' && (
                    <Link to="/create-event" className="btn-primary">Create Event</Link>
                )}
            </div>

            <div className="events-grid">
                {events.length === 0 ? (
                    <p>No events available</p>
                ) : (
                    events.map((event) => (
                        <div key={event._id} className="event-card">
                            <h3>{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-details">
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Price:</strong> ${event.price}</p>
                                <p><strong>Capacity:</strong> {event.capacity}</p>
                            </div>
                            <Link to={`/events/${event._id}`} className="btn-secondary">View Details</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
