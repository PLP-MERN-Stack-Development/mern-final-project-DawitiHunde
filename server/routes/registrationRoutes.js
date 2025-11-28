const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getMyRegistrations,
    getEventRegistrations,
} = require('../controllers/registrationController');
const { protect, organizer } = require('../middleware/authMiddleware');

router.post('/', protect, registerForEvent);
router.get('/my', protect, getMyRegistrations);
router.get('/event/:eventId', protect, organizer, getEventRegistrations);

module.exports = router;
