const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  try {
    // Extracting email, password, and name from the request body
    const { email, password, name } = req.body;

    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating a new user using the provided email, hashed password, and name
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generating a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    // Sending a response with the new user and the generated token
    res.status(200).json({ newUser, token });
  } catch (error) {
    // Handling any errors that occur during the process
    res.status(500).json({ message: "Something went wrong" });
  }
};


const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ error: "User doesn't exist" });

    // Comparing the provided password with the hashed password stored in the database
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!correctPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    // Generating a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Sending a response with the logged-in user and the generated token
    res.status(200).json({ loggedInUser: existingUser, token });
  } catch (error) {
    // Handling any errors that occur during the process
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  signUp,
  signIn,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers
};
