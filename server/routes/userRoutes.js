const express = require("express");

const { signUp, signIn, deleteUser, updateUser, getUser, getAllUsers } = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
