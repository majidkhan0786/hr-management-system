const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAttendanceByEmployee,
  getAllAttendance
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/", getAllAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;
