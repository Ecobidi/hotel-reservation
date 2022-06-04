const router = require('express').Router()
const GuestController = require('../controllers/guest')

router.get('/', GuestController.getAllGuests)

router.post('/new', GuestController.handleCreateGuest)

router.get('/remove/:guest_id', GuestController.removeGuest)

module.exports = router