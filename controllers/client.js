const ReservationService = require('../services/reservation')

class ClientController {
  static async getClientHome(req, res) {
    res.render('client/home')
  }

  static async getReservationPage(req, res) {
    res.render('client/reservation')
  }

  static async handleReservation(req, res) {
    let dao = req.body
    try {
      let reservation = await ReservationService.save(dao)
      req.flash('success_msg', 'Reservation number is ' + reservation.serial_number  + '. Present it to the Receptionist on arrival')
      res.redirect('/client/reservation')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error sending reservation request')
      res.redirect('/client')
    }
  }

}

module.exports = ClientController