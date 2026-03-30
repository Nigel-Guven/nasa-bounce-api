const express = require('express');
const cors = require('cors');

const app = express();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(cors());
app.use(express.json());

// Routes
const nasaRoutes = require('./routes/nasaRoutes');
app.use('/api/v1', nasaRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ status: 'API is running 🚀' });
});

module.exports = app;