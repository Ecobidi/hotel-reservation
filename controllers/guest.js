const GuestService = require('../services/guest')

class GuestController {

  static async getAllGuests(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let guests = await GuestService.findByName(req.query.search) 
      return res.render('guests', { guests }) 
    }
    let guests = await GuestService.findAll()
    res.render('guests', { guests })
  }

  static async handleCreateGuest(req, res) {
    try {
      await GuestService.save(req.body)
      req.flash('success_msg', 'Guest Created')
      res.redirect('/guests')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error while attempting to create guest')
      req.redirect('/guests')      
    }
  }

  static async removeGuest(req, res) {
    try {
      await GuestService.removeOne(req.params.guest_id)
      res.redirect('/guests')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/guests')
    }
  }

}

module.exports = GuestController