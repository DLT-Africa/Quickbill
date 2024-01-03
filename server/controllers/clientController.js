const Client = require("../models/clientModel");
const User = require("../models/userModel");
const { sendClientInvitationMail } = require("../utils/sendMail");

const createClient = async (req, res) => {
	try {
		const { name, email, address } = req.body;
		const clientFor = req.userId;
		const userEmail = req.userEmail;

		if (email === userEmail) {
			return res
				.status(400)
				.json({ message: "You cannot register yourself as a client" });
		}

		const clientAsRegisteredUser = await User.findOne({ email });

		if (!clientAsRegisteredUser) {
			return res
				.status(404)
				.json({ error: "This email is not a registered user" });
		}

		//If client is already a client of the employer, return an error
		const existingClient = await Client.findOne({ email, clientFor });
		if (existingClient) {
			return res
				.status(400)
				.json({ message: "You have registered this client already" });
		}

		const newClient = new Client({
			name,
			email,
			address,
			clientFor,
		});

		await newClient.save();
		res.status(201).json(newClient);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const inviteUnregisteredUser = async (req, res) => {
	try {
		const clientEmail = req.body.email;
		const inviterId = req.userId;
		const inviter = await User.findById(inviterId);
		const inviterEmail = inviter.email;
		const inviterName = inviter.name;
		sendClientInvitationMail({ inviterEmail, inviterName, clientEmail }, res);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getClient = async (req, res) => {
	try {
		const clientId = req.params.id;
		const client = await Client.findById(clientId);

		if (!client) {
			return res.status(404).json({ error: "Client not found" });
		}

		res.status(200).json(client);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllClients = async (req, res) => {
	try {
		const clientFor = req.userId;
		const clients = await Client.find({ clientFor });
		res.status(200).json(clients);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updateClient = async (req, res) => {
	try {
		const clientId = req.params.id;
		const updateData = req.body;
		const clientFor = req.userId;

		const updatedClient = await Client.findByIdAndUpdate(clientId, updateData, {
			new: true,
			runValidators: true,
		});
		if (!updatedClient) {
			return res.status(404).json({ error: "Client not found" });
		}

		const clients = await Client.find({ clientFor });

		res.status(200).json(clients);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const deleteClient = async (req, res) => {
	try {
		const clientId = req.params.id;
		const clientFor = req.userId;

		const deletedClient = await Client.findByIdAndDelete(clientId);

		if (!deletedClient) {
			return res.status(404).json({ error: "Client not found" });
		}
		const clients = await Client.find({ clientFor });

		res.status(200).json(clients);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	createClient,
	getAllClients,
	getClient,
	updateClient,
	deleteClient,
	inviteUnregisteredUser,
};
