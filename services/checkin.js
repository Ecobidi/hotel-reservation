const CheckInModel = require('../models/checkin')

class CheckInService {

  static async findById(id) {
    return CheckInModel.findById(id).populate('guest').populate('room').exec()
  }

  static async findByRoomNumber(room_number) {
    return CheckInModel.find({room_number}).populate('guest').populate('room').exec()
  }

  static async findByGuestName(guest_name) {
    let pattern = new RegExp(guest_name, 'ig')
    return CheckInModel.find({guest_name: pattern}).populate('guest').populate('room').exec()
  }
  
  static async findAll() {
    return CheckInModel.find({}).populate('guest').populate('room').exec()
  }

  static async save(dao) {
    return CheckInModel.create(dao)
  }

  // static async updateOne(room_number, update_dao) {
  //   return CheckInModel.findOneAndUpdate()
  // }

  static async removeOne(id) {
    return CheckInModel.findByIdAndRemove(id)
  }

}

module.exports = CheckInService