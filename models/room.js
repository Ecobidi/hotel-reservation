const mongoose = require('mongoose')
const DBCounterModel = require('./db_counter')

const RoomSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  room_number: {
    type: String,
    required: true,
    unique: true,
  },
  number_of_beds: {
    type: Number,
    default: 1,
  },
  floor: {
    type: String,
    required: true,
  },
  cost_per_night: {
    type: Number,
  },
  room_type: {
    type: String,
    enum: ['VIP', 'Regular', 'Family'],
  },
  available: {
    type: Boolean,
    default: true,
  }
})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

RoomSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("rooms_id")
  }
  next()
})

module.exports = mongoose.model('room', RoomSchema)