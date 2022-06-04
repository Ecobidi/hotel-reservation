const CheckInService = require('../services/checkin')
const GuestService = require('../services/guest')
const RoomService = require('../services/room')
const ReservationService = require('../services/reservation')

class ReservationController {
  static async getAllReservations(req, res) {
    let reservations
    if (req.query.search) {
      reservations = await ReservationService.findByCustomerName(req.query.search)
    } else {
      reservations = await ReservationService.findAll()
    }
    res.render('reservations', { reservations })
  }

  static async removeReservation(req, res) {
    try {
      await ReservationService.removeOne(req.params.reservation_id)
      res.redirect('/reservations')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error occcured')
      res.redirect('/reservations')      
    }
  }
}

module.exports = ReservationController