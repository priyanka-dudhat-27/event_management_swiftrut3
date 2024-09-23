/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditEvent = () => {
    const { eventId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        image: null, // Change this to null initially
        eventStartDate: '',
        eventEndDate: '',
        location: '',
        eventType: '',
        attendees: 1,
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/event/getEventById/${eventId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error.response ? error.response.data : error.message);
                setMessage('Failed to load event data.');
            }
        };

        fetchEventData();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, image: files[0] }); // Store the file
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('image', formData.image); // Append the file
        uploadData.append('eventStartDate', formData.eventStartDate);
        uploadData.append('eventEndDate', formData.eventEndDate);
        uploadData.append('location', formData.location);
        uploadData.append('eventType', formData.eventType);
        uploadData.append('attendees', formData.attendees);

        try {
            await axios.put(`${BASE_URL}/event/editEvent/${eventId}`, uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMessage('Event updated successfully!');
            navigate('/my-events');
        } catch (error) {
            console.error('Error updating event:', error.response ? error.response.data : error.message);
            setMessage('Failed to update event.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6">Edit Event</h2>
            {message && <p className="text-red-500 text-center">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Event Title"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="date"
                    name="eventStartDate"
                    value={formData.eventStartDate.split('T')[0]} // Format for input
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="date"
                    name="eventEndDate"
                    value={formData.eventEndDate.split('T')[0]} // Format for input
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Location"
                />
                <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select Event Type</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Networking Event">Networking Event</option>
                    <option value="Festival">Festival</option>
                    <option value="Party">Party</option>
                </select>
                <input
                    type="number"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Number of Attendees"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default EditEvent;
