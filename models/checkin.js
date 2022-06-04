const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

const CheckInSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'guest',
  },
  guest_name: {
    type: String,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room',
    required: true,
  },
  room_number: {
    type: String,
  },
  check_in_date: {
    type: Date,
    default: Date.now,
  },
  check_out_date: {
    type: Date,
  },
  card_number: {
    type: String,
  },
  card_cvv: {
    type: Number,
  },
  total_room_cost: {
    type: Number,
  },
  checked_out: {
    type: Boolean,
    default: false,
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

CheckInSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("check_ins_id")
  }
  next()
})

module.exports = mongoose.model('checkin', CheckInSchema)