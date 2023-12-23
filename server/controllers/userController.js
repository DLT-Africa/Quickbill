const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = new User.create({
      email,
      password: hashedPassword,
      name,
    });
        await result.save()
        
    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json({ result, userProfile, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ result: existingUser, userProfile, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signUp,
  signIn,
};
