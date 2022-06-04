const router = require('express').Router()
const RoomController = require('../controllers/room')
const CheckInController = require('../controllers/checkin')

router.get('/', RoomController.getAllRooms)

router.get('/available', RoomController.getAllAvailableRooms)

router.get('/checkin', CheckInController.getCheckInPage)

router.post('/checkin', CheckInController.handleCheckIn)

router.post('/new', RoomController.handleCreateRoom)

router.get('/remove/:room_id', RoomController.removeRoom)

module.exports = router