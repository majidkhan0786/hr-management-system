const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields required" });
    }

    const attendance = await Attendance.create({
      employeeId: employeeId,
      date,
      status
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employeeId", "fullName email employeeId")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  const records = await Attendance.find({
    employee: req.params.employeeId
  });

  res.json(records);
};
