const mongoose = require("mongoose");

const employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const { employerId, email, name, department, jobTitle } = req.body;

    const existingEmployee = await employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email address already in use" });
    }

    const newEmployee = new employee({
      employerId,
      email,
      name,
      department,
      jobTitle,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {createEmployee}