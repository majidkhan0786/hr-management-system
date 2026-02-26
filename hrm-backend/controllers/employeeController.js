const Employee = require("../models/Employee");

exports.addEmployee = async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Employee.findOne({ employeeId });
    if (existing) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department
    });

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Not found" });

  await employee.deleteOne();
  res.json({ message: "Employee deleted" });
};
