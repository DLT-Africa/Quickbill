const express = require("express");

const {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const {protectedRoute} = require("../middleware/protectedRoute")

const router = express.Router()

router.post("/create", protectedRoute, createClient)
router.get("/", protectedRoute, getAllClients)
router.get("/:id", protectedRoute, getClient)
router.put("/:id", protectedRoute, updateClient)
router.delete("/:id", protectedRoute, deleteClient)

module.exports = router