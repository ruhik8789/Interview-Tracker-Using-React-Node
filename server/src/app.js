const express = require("express");
const cors = require("cors");

const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/interviews", interviewRoutes);

module.exports = app;