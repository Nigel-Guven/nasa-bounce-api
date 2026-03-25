const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const nasaRoutes = require('./routes/nasaRoutes');
app.use('/api', nasaRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;