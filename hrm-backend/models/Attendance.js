const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present"
    }
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

attendanceSchema.pre("save", function (next) {
  const d = new Date(this.date);
  d.setHours(0, 0, 0, 0);
  this.date = d;
  next();
});

module.exports = mongoose.model("Attendance", attendanceSchema);
