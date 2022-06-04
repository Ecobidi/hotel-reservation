const GuestModel = require('../models/guest')

class GuestService {
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return GuestModel.find({name: pattern})
  }

  static async findById(id) {
    return GuestModel.findById(id)
  }
  
  static async findAll() {
    return GuestModel.find()
  }

  static async save(dao) {
    return GuestModel.create(dao)
  }

  static async removeOne(id) {
    return GuestModel.findByIdAndRemove(id)
  }

}

module.exports = GuestService