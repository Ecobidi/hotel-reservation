const router = require('express').Router()
const CheckInController = require('../controllers/checkin')

router.get('/', CheckInController.handleCheckOut)

module.exports = router