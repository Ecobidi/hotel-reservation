const router = require('express').Router()
const ReservationController = require('../controllers/reservation')

router.get('/', ReservationController.getAllReservations)

router.get('/remove/:reservation_id', ReservationController.removeReservation)

module.exports = router