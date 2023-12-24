const Employee = require("../models/employeeModel");
const User = require("../models/userModel");

const createEmployee = async (req, res) => {
  try {
    const { employerId, email, name, department, jobTitle } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email address already in use" });
    }

    //Create a new employee
    const newEmployee = await Employee.create({
      employerId,
      email,
      name,
      department,
      jobTitle,
    });

    //Obtain the ID of the new employee
    const newEmployeeId = newEmployee._id;

    //Update the user document's employees array with the new employee ID
    const updatedEmployer = await User.findByIdAndUpdate(
      employerId,
      { $push: { employees: newEmployeeId } },
      { new: true }
    );
    if (!updatedEmployer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    res.status(201).json({
      message: "Employee created successfully",
      newEmployee,
      updatedEmployer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getEmployee = async (req, res) => {
  // res.send("employee")
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updateData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  createEmployee,
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee
};
