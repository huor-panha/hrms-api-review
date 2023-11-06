const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 
const helmet = require('helmet');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes would go here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./src/routes/userRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);


app.use(helmet());

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger'); // Make sure the path is correct

const swaggerSpecs = swaggerJsdoc(options);

const basicAuth = require('express-basic-auth');

const getUnauthorizedResponse = (req) => {
  return req.auth
    ? ('Credentials ' + req.auth.user + ' rejected')
    : 'No credentials provided';
};

const basicAuthOptions = {
  users: { 'admin': 'password' }, // Replace 'admin' and 'password' with your actual start username and password
  challenge: true, // Cause browsers to show a login dialog
  unauthorizedResponse: getUnauthorizedResponse
};

app.use('/api-docs', basicAuth(basicAuthOptions), swaggerUi.serve, swaggerUi.setup(swaggerSpecs));