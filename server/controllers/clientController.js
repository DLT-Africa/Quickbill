const Client = require("../models/clientModel");

const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = new Client(clientData);
    await newClient.save();
    res.status(201).json(newClient);
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
    const { clientFor } = req.body;

    const clients = await Client.find({clientFor});
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

    const updatedClient = await Client.findByIdAndUpdate(clientId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res
      .status(200)
      .json({ message: "Client deleted successfully", deletedClient });
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
};
