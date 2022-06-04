const router = require('express').Router()
const CheckInController = require('../controllers/checkin')

router.get('/', CheckInController.getAllCheckIns)

router.get('/remove/:checkin_id', CheckInController.removeCheckIn)

module.exports = router