import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import API_URL from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${API_URL}/api/registrations/my`,
                    config
                );
                setRegistrations(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchRegistrations();
        }
    }, [user]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>My Dashboard</h1>

            {user?.role === 'organizer' && (
                <div className="dashboard-actions">
                    <Link to="/create-event" className="btn-primary">Create New Event</Link>
                </div>
            )}

            <div className="dashboard-section">
                <h2>My Registrations</h2>
                {registrations.length === 0 ? (
                    <p>You haven't registered for any events yet.</p>
                ) : (
                    <div className="registrations-list">
                        {registrations.map((reg) => (
                            <div key={reg._id} className="registration-card">
                                <h3>{reg.event?.title}</h3>
                                <p><strong>Date:</strong> {new Date(reg.event?.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {reg.event?.location}</p>
                                <p><strong>Ticket Code:</strong> <code>{reg.ticketCode}</code></p>
                                <p><strong>Status:</strong> <span className={`status-${reg.status}`}>{reg.status}</span></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
