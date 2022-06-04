const CheckInService = require('../services/checkin')
const GuestService = require('../services/guest')
const RoomService = require('../services/room')

class CheckInController {
  static async getAllCheckIns(req, res) {
    let checkins
    if (req.query.search) {
      checkins = await CheckInService.findByGuestName(req.query.search)
    } else {
      checkins = await CheckInService.findAll()
    }
    res.render('checkins', { checkins })
  }

  static async getCheckInPage(req, res) {
    try {
      let room = await RoomService.findById(req.query.room_id)
      if (!room) throw new Error('Incorrect Room ID Provided')
      res.render('checkin-page', { room })
    } catch (error) {
      console.log(Error) 
      req.flash('error_msg', 'Error Getting CHECK-IN Page')
      res.redirect('/rooms/available')  
    }
  }

  static async handleCheckIn(req, res) {
    let { name, phone, address, id_card_type, id_card_number, check_in_date, check_out_date, card_number, card_cvv, room_id } = req.body
    let checkInDate = new Date(check_in_date)
    let checkOutDate = new Date(check_out_date)
    let difference = (checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)
    try {
      // save guest
      let guest = await GuestService.save({name, phone, address, id_card_type, id_card_number})
      // mark room as unavailable
      let room = await RoomService.findById(room_id)
      await RoomService.updateAvailabilityStatus(room_id, false)
      await CheckInService.save({guest: guest._id, guest_name: guest.name, room: room_id, room_num: room.room_number, check_in_date, check_out_date, card_number, card_cvv,
         total_room_cost: room.cost_per_night * difference})
      res.redirect('/checkins')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error handling CHECK-IN')
      res.redirect('/')
    }
  }

  static async handleCheckOut(req, res) {
    let checkin_id = req.query.checkin_id
    try {
      let checkin = await CheckInService.findById(checkin_id)
      if (!checkin) throw new Error('Invalid Check In ID passed')
      checkin.checked_out = true
      await Promise.all([checkin.save(), RoomService.updateAvailabilityStatus(checkin.room._id, true)])
      req.flash('success_msg', 'Guest Successfully Checked Out')
      res.redirect('/checkins')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error handling CHECK-OUT')
      res.redirect('/checkins')
    }
  }

  static async removeCheckIn(req, res) {
    try {
      await CheckInService.removeOne(req.params.checkin_id)
      res.redirect('/checkins')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error removing Check In')
      res.redirect('/checkins')      
    }
  }
}

module.exports = CheckInController