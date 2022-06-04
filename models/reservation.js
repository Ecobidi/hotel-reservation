const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

const ReservationSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  room_type: {
    type: String,
  },
  time_of_reservation: {
    type: Date,
    default: Date.now
  },
  customer_name: {
    type: String,
  },
  customer_phone: {
    type: String,
  },
  check_in_date: {
    type: Date,
  },
  check_out_date: {
    type: Date,
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

ReservationSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("reservations_id")
  }
  next()
})

module.exports = mongoose.model('reservation', ReservationSchema)