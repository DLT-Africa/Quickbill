const express = require("express");

const { deleteUser, updateUser, getUser, getAllUsers } = require("../controllers/userController.js");

const router = express.Router();

router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
