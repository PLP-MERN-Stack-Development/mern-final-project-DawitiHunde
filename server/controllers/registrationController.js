const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { v4: uuidv4 } = require('uuid');

exports.registerForEvent = async (req, res) => {
    const { eventId } = req.body;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const existingRegistration = await Registration.findOne({
            user: req.user._id,
            event: eventId,
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = new Registration({
            user: req.user._id,
            event: eventId,
            ticketCode: uuidv4(),
        });

        const createdRegistration = await registration.save();
        res.status(201).json(createdRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id }).populate(
            'event',
            'title date location'
        );
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventRegistrations = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view registrations for this event' });
        }

        const registrations = await Registration.find({ event: req.params.eventId }).populate(
            'user',
            'name email'
        );
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
