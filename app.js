require('dotenv').config()
const express = require('express');
const connectDb = require('./utils/db');
const commonRoutes = require('./routes/commonRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const dealershipRoutes = require('./routes/dealershipRoutes');


const app = express();
connectDb()

app.use(express.json());



app.use('/api', commonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dealership', dealershipRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
