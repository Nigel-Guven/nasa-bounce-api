const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(cors());
app.use(express.json());

const nasaRoutes = require('./routes/nasaRoutes');
app.use('/api', nasaRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.json({ status: 'API is running 🚀' });
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;