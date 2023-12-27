const mongoose = require("mongoose");

const UnconfirmedUserSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	token: { type: String, required: true },
	// tokenExpiryDate: { type: Date, required: true },
	createdAt: { type: Date, expires: "10m", default: Date.now },
});

const UnconfirmedUser = mongoose.model(
	"UnconfirmedUser",
	UnconfirmedUserSchema
);

module.exports = UnconfirmedUser;
