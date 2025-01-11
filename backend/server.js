const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const birthCertificateRoutes = require('./routes/birthCertificate');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', birthCertificateRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));