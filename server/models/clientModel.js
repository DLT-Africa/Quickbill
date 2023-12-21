
const mongoose = require ("mongoose");

const clientSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    clientFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client
