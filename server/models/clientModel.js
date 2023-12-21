const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  userId: { type: [String] },
  createdAt: { type: Date, default: new Date(), required: true },
});
const clientModel = mongoose.model("clientModel", clientSchema);

module.exports = clientModel;
