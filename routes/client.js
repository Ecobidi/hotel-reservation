const router = require('express').Router()
const ClientController = require('../controllers/client')

router.get('/', ClientController.getClientHome)

router.get('/reservation', ClientController.getReservationPage)

router.post('/reservation', ClientController.handleReservation)

module.exports = router