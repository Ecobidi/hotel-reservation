const ReservationModel = require('../models/reservation')

class ReservationService {

  static async findByReservationNumber(serial_number) {
    return ReservationModel.findOne({serial_number})
  }

  static async findById(id) {
    return ReservationModel.findById(id)
  }

  static async findByRoomNumber(room_number) {
    return ReservationModel.find({room_number})
  }

  static async findByCustomerName(customer_name) {
    let pattern = new RegExp(customer_name, 'ig')
    return ReservationModel.find({customer_name: pattern})
  }
  
  static async findAll() {
    return ReservationModel.find({})
  }

  static async save(dao) {
    return ReservationModel.create(dao)
  }

  // static async updateOne(room_number, update_dao) {
  //   return ReservationModel.findOneAndUpdate()
  // }

  static async removeOne(id) {
    return ReservationModel.findByIdAndRemove(id)
  }

}

module.exports = ReservationService