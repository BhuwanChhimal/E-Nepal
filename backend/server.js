require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const birthCertificateRoutes = require('./routes/birthCertificate');
const citizenshipRoutes = require('./routes/citizenship');
const nationalIdRoutes = require('./routes/nationalId'); // Import national ID routes
const passportRoutes = require('./routes/passport'); // Import passport routes
const licenseRoutes = require('./routes/license');
const panCardRoutes = require('./routes/panCard');
const complaintBoxRoutes = require('./routes/complaintBox');
const taxRoutes = require('./routes/tax');
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', birthCertificateRoutes);
app.use('/api', citizenshipRoutes);
app.use('/api', nationalIdRoutes); // Add national ID routes
app.use('/api', passportRoutes); // Add passport routes
app.use('/api', licenseRoutes);
app.use('/api', panCardRoutes);
app.use('/api', complaintBoxRoutes);
app.use('/api', taxRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));