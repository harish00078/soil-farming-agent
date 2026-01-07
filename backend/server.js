require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
connectDB();
app.listen(5001, () => console.log("Backend running on port 5001"));
