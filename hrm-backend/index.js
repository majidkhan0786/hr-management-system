const cors = require("cors");
const express = require("express");

const { dbConnection } = require("./config/db");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});

const app = express();

/* -------- Middlewares -------- */
app.use(
  cors({
    origin: "*", // For public access (change to specific domain for security)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/* -------- Routes -------- */
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));

/* -------- Server Initialization -------- */
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await dbConnection;
    console.log("Connected to the Database");
  } catch (error) {
    console.error("Error connecting to the Database:", error.message);
  }

  console.log(process.env.API_URL, "API_URL");
  console.log(process.env.WEBSITE_URL, "WEBSITE_URL");
  console.log(`Server is running on port ${PORT}`);
});
