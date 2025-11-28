const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const { protect, organizer } = require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect, organizer, createEvent);
router
    .route('/:id')
    .get(getEventById)
    .put(protect, organizer, updateEvent)
    .delete(protect, organizer, deleteEvent);

module.exports = router;
