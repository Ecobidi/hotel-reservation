const RoomService = require('../services/room')

class RoomController {

  static async getAllRooms(req, res) {
    let rooms
    if (req.query.search) {
      rooms = await RoomService.findByRoomNumber(req.query.search)
    } else {
      rooms = await RoomService.findAll()
    }
    res.render('rooms', { rooms })
  }

  static async getAllAvailableRooms(req, res) {
    let availableRooms = await RoomService.findAvailable(req.query)
    res.render('available-rooms', { availableRooms })
  }

  static async handleCreateRoom(req, res) {
    try {
      await RoomService.save(req.body)
      req.flash('success_msg', 'Room Created')
      res.redirect('/rooms')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error while attempting to create room')
      req.redirect('/rooms')      
    }
  }

  static async removeRoom(req, res) {
    try {
      await RoomService.removeOne(req.params.room_id)
      res.redirect('rooms')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('rooms')
    }
  }

}

module.exports = RoomController