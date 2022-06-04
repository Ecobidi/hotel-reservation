const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  id_card_type: {
    type: String,
  },
  id_card_number: {
    type: String,
  },
  date_of_check_in: {
    type: Date,
    default: Date.now,
  },
  registration_type: {
    type: String,
    enum: ['Walk-In Guest', 'Online Guest']
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

GuestSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("guests_id")
  }
  next()
})

module.exports = mongoose.model('guest', GuestSchema)