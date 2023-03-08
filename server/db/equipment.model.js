const mongoose = require('mongoose');

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  price: Number,
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }
}); 

module.exports = mongoose.model("Equipment", EquipmentSchema);
