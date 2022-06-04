const RoomModel = require('../models/room')

class RoomService {

  static async findById(id) {
    return RoomModel.findById(id)
  }

  static async findByRoomNumber(room_number) {
    return RoomModel.find({room_number: new RegExp(room_number, 'ig')})
  }

  static async findAvailable(params) {
    return RoomModel.find({available: true, ...params})
  }
  
  static async findAll() {
    return RoomModel.find({})
  }

  static async save(dao) {
    return RoomModel.create(dao)
  }

  static async updateOne(room_number, dao) {
    return RoomModel.findOneAndUpdate({room_number}, {$set: {...dao}})
  }

  static async updateAvailabilityStatus(room_id, is_room_available) {
    return RoomModel.findByIdAndUpdate(room_id, {$set: {available: is_room_available}})
  }

  static async removeOne(id) {
    return RoomModel.findByIdAndRemove(id)
  }

}

module.exports = RoomService