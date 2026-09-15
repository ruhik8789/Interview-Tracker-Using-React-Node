const express = require("express");
const cors = require("cors");

const interviewRoutes = require("./routes/interviewRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/interviews", interviewRoutes);

app.use(errorHandler);

module.exports = app;