const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/soils", require("./routes/soilRoutes"));
app.use("/api/distributors", require("./routes/distributorRoutes"));
module.exports = app;
