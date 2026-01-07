const express = require("express");
const app = express();
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/soils", require("./routes/soilRoutes"));
app.use("/api/distributors", require("./routes/distributorRoutes"));
module.exports = app;
