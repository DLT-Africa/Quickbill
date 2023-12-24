const express = require("express");

const {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = express.Router()

router.post("/create", createClient)
router.get("/", getAllClients)
router.get("/:id", getClient)
router.put("/:id", updateClient)
router.delete("/:id", deleteClient)

module.exports = router