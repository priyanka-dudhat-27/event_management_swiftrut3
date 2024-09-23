/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <div className="max-w-sm mx-2 my-4 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white border border-gray-200">
            <img
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                src={event.image}
                alt={event.title}
            />
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-gray-600 mt-2">
                    <strong>Start Date:</strong> {new Date(event.eventStartDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                    <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-600">
                    <strong>Type:</strong> {event.eventType}
                </p>
                <p className="text-gray-600">
                    <strong>Attendees:</strong> {event.attendees}
                </p>
                <p className="text-gray-600">
                    <strong>Created By:</strong> {event.createdBy?.username || 'Unknown'}
                </p>
            </div>
            <div className="p-4 border-t border-gray-200">
                <Link to={`/event/${event._id}`}>
                    <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        eventStartDate: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        eventType: PropTypes.string.isRequired,
        attendees: PropTypes.number.isRequired,
        createdBy: PropTypes.shape({
            username: PropTypes.string,
        }),
    }).isRequired,
};

export default EventCard;
