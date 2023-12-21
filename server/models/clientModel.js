const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: [String] },
  createdAt: { type: Date, default: new Date(), required: true },
});
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
